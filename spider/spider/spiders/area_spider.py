# -*- coding: utf-8 -*-
from ..items import AirHistoryItem, SpiderItem
import json
from urllib.parse import urlparse
from copy import deepcopy
import scrapy
import pandas as pd
from scrapy.item import Item, Field


class AreaSpiderSpider(scrapy.Spider):
    name = 'area_spider'
    config = []
    next = None
    # allowed_domains = ['www.baidu.com']  # 爬取的域名，不会超出这个顶级域名
    # base_url = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=54093922_12_hao_pg&wd=raise%20WebDriverException(%20selenium.common.exceptions.WebDriverException%3A%20Message%3A%20%27macos%27%20executable%20needs%20to%20be%20in%20PATH.%20Please%20see%20https%3A%2F%2Fsites.google.com%2Fa%2Fchromium.org%2Fchromedriver%2Fhome&oq=You%2520are%2520running%2520the%2520esm-bundler%2520build%2520of%2520vue-i18n.%2520It%2520is%2520recommended%2520to%2520conf&rsv_pq=fbbe0d3200ac3ccb&rsv_t=60caH82AxInWPOQ4CAyNW%2BE0GpT6obUy3MiF8Il2OIkPkhR7kA4hj%2BMuT8R65GVoOSzN148ag%2FrF&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=2&rsv_btype=t&inputT=2404&rsv_sug4=2495"
    # start_urls = [base_url]

    def __init__(self, sping=None, *args, **kwargs):
        super(AreaSpiderSpider, self).__init__(*args, **kwargs)
        # 读取json文件内容,返回字典格式
        with open(sping, 'r', encoding='utf8')as fp:
            data = json.load(fp)
            self.allowed_domains = data['allowed_domains']
            self.base_url = data['base_url']
            self.start_urls = data['start_urls']
            self.config = data['data']
            self.next = data['next']

    def url(self, item, config, response):
        res = response.xpath(config['xpath'] + '/@href').extract()
        yield scrapy.Request(url=res[0], callback=self.getUrl, meta=config['config'])

    def getUrl(self, response):
        meta = response.meta
        data = meta['data']
        config = meta['config']
        configs = meta['configs']
        field = config['title']

        if isinstance(config['config'], list):
            data[field] = {}
            for xconf in config['config']:
                if xconf['type'] == 'text':
                    res = response.xpath(xconf['xpath'] + '//text()').extract()
                elif xconf['type'] == 'html':
                    res = response.xpath(xconf['xpath'] + '//node()').extract()
                data[field][xconf['title']] = '\n'.join(res)
        else:
            if config['type'] == 'text':
                res = response.xpath(
                    config['config']['xpath'] + '//text()').extract()
            elif config['type'] == 'html':
                res = response.xpath(
                    config['config']['xpath'] + '//node()').extract()
            data[field] = '\n'.join(res)

        if len(configs) != 0:
            meta = {'configs': configs[1:], 'data': data, 'config': configs[0]}
            yield scrapy.Request(url=configs[0]['url'], callback=self.getUrl, meta=meta)
        else:
            item = SpiderItem()
            for k in data:
                item.fields[k] = Field()
                item[k] = data[k]
            yield item

    def parse(self, response):
        print('开始爬取 ....')
        pdd = pd.DataFrame(self.config).groupby('type').apply(
            lambda x: x.to_dict('records')).to_dict()

        data = {}
        for k in pdd.keys():
            if k == 'text':
                for p in pdd['text']:
                    res = response.xpath(p['xpath'] + '//text()').extract()
            elif k == 'html':
                for p in pdd['html']:
                    res = response.xpath(p['xpath'] + '//node()').extract()
            data[p['title']] = '\n'.join(res)

        if 'url' in pdd:
            baseURL = urlparse(self.base_url)
            urlPrfix = baseURL.scheme + '://' + baseURL.netloc + '/'
            https = []
            for p in pdd['url']:
                res = response.xpath(p['xpath'] + '//@href').extract()
                url = urlPrfix + res[0]
                p['url'] = url
                https.append(p)

            meta = {'configs': https[1:], 'data': data, 'config': https[0]}
            yield scrapy.Request(url=https[0]['url'], callback=self.getUrl, meta=meta)
        else:
            item = SpiderItem()
            for k in data:
                item.fields[k] = Field()
                item[k] = data[k]
            yield item

        # res = response.xpath(self.next + '//@href').extract()
        # baseURL = urlparse(self.base_url)
        # print(2222, baseURL.scheme + '://' + baseURL.netloc + '/' + res[0])
        # yield scrapy.Request(url=baseURL.scheme + '://' + baseURL.netloc + '/' + res[0], callback=self.parse)
        for i in range(1, 100):
            url = self.base_url + '&page=' + str(i)
            yield scrapy.Request(url, callback=self.parse)
