/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { readFileSync, removeSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Axios from 'axios';
import cheerio, { Cheerio, CheerioAPI } from 'cheerio';
import iconv from 'iconv-lite';
import { find } from 'lodash';
import { Agent } from 'https';
import { parse } from 'url';

const app = new Koa();
app.use(bodyParser());


const axios = Axios.create({ responseType: 'stream' });
const httpsAgent = new Agent({ rejectUnauthorized: false });

app.use(async (ctx, next) => {
    if (/\.(js|css)$/.test(ctx.path)) {
        ctx.body = readFileSync(join(__dirname, 'public', ctx.path.slice(1)));
        ctx.type = 'application/javascript; charset=utf-8';
        return await next();
    }
    const query = ctx.request.query;
    if (query && query.to) {
        // const res = await axios.get(query.to as string, { httpsAgent });
        const res = await axios.get(query.to as string);
        const [data, buffer] = await new Promise<[string, Buffer]>(resolve => {
            const chunks: Buffer[] = [];
            res.data.on('data', (chunk: Buffer) => {
                chunks.push(chunk);
            });
            res.data.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const str = iconv.decode(buffer, 'utf-8');
                resolve([str, buffer]);
            });
        });
        const { protocol, host } = parse(query.to as string);
        const tpl = readFileSync(join(__dirname, 'public/index.html')).toString().replace('{{base}}', `${protocol}//${host}`);
        const $m = cheerio.load(tpl);
        $m('#action').attr('value', query.to as string);
        let $ = cheerio.load(data);
        const charset = find($('meta[content]'), e => $(e).attr('content')?.indexOf('charset') !== -1);
        if (charset) {
            const c = (($(charset).attr('content') || '').split(';').find(n => n.indexOf('charset=') !== -1) || '').trim().replace('charset=', '');
            if (c) $ = cheerio.load(iconv.decode(buffer, c));
        }
        $m('head').html([$m('head').html(), $('head').html()].join('\n'));
        const script = readFileSync(join(__dirname, 'public/assets/index.js')).toString();
        removeSync(join(__dirname, 'public/index.js'));
        writeFileSync(join(__dirname, 'public/index.js'), script.replace('{{html}}', $('body').html() || ''));
        $m('body').html(readFileSync(join(__dirname, 'public/index.html')).toString());

        ctx.body = $m.html();
    } else {
        ctx.body = readFileSync(join(__dirname, 'public/index.html'));
    }
    return await next();
});

app.listen(3000);
