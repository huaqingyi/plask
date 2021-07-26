# -*- coding: utf-8 -*-
from ..items import AirHistoryItem
import json
from urllib.parse import urlparse
import scrapy
import pandas as pd
from scrapy.item import Item, Field


class AreaSpiderSpider(scrapy.Spider):
    name = 'area_spider'
    config = []
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

    def text(self, data, config, response):
        res = response.xpath(config['xpath'] + '//text()').extract()
        data[config['title']] = '\n'.join(res)
        return data

    def url(self, item, config, response):
        res = response.xpath(config['xpath'] + '/@href').extract()
        yield scrapy.Request(url=res[0], callback=self.getUrl, meta=config['config'])

    def getUrl(self, response):
        meta = response.meta
        res = response.xpath(meta['config']['xpath'] + '//text()').extract()
        item = Item()
        for d in meta['data']:
            item.fields[d] = Field()
            item[d] = meta['data'][d]

        field = meta['config']['title']
        item.fields[field] = Field()
        item[field] = '\n'.join(res)
        yield item

    def parse(self, response):
        print('开始爬取 ....')
        pdd = pd.DataFrame(self.config).groupby('type').apply(
            lambda x: x.to_dict('records')).to_dict()

        data = {}
        for p in pdd['text']:
            data = self.text(data, p, response)

        baseURL = urlparse(self.base_url)
        urlPrfix = baseURL.scheme + '://' + baseURL.netloc + '/'    
        for p in pdd['url']:
            res = response.xpath(p['xpath'] + '//@href').extract()
            url = urlPrfix + res[0]
            yield scrapy.Request(url=url, callback=self.getUrl, meta={'config': p['config'], 'data': data})
        # print(-1111, data)
        # item = Item()
        # for config in self.config:
        #     item.fields[config['title']] = Field()
        #     func = getattr(self, config['type'])

        #     if hasattr(config, 'config') == False:
        #         config['config'] = {}

        #     yield func(item, config, response)
        #     print(111222)
        # yield item

    # def parse(self, response):
    #     print('爬取城市信息....')
    #     title = response.xpath('//*[@id=\"3\"]/h3[1]/a[1]//text()').extract()
    #     href = response.xpath('//*[@id=\"3\"]/h3[1]/a[1]/@href').extract()
    #     # print(title, href)
    #     content = yield scrapy.Request(url=href[0], callback=self.detail, meta={})
    #     print(111, content)

    #     # url_list = response.xpath("//div[@class='all']/div[@class='bottom']/ul/div[2]/li/a/@href").extract()  # 全部链接
    #     # city_list = response.xpath("//div[@class='all']/div[@class='bottom']/ul/div[2]/li/a/text()").extract()  # 城市名称
    #     # for url, city in zip(url_list, city_list):
    #     #     url = self.base_url + url
    #     #     yield scrapy.Request(url=url, callback=self.parse_month, meta={'city': city})

    def detail(self, response):
        content = response.xpath('/html/body//text()').extract()
        yield content

    # def parse_month(self, response):
    #     print('爬取{}月份...'.format(response.meta['city']))
    #     url_list = response.xpath('//tbody/tr/td/a/@href').extract()
    #     for url in url_list:
    #         url = self.base_url + url
    #         yield scrapy.Request(url=url, callback=self.parse_day, meta={'city': response.meta['city']})

    # def parse_day(self, response):
    #     print('爬取最终数据...')
    #     item = AirHistoryItem()
    #     node_list = response.xpath('//tr')
    #     node_list.pop(0)  # 去除第一行标题栏
    #     for node in node_list:
    #         item['data'] = node.xpath('./td[1]/text()').extract_first()
    #         item['city'] = response.meta['city']
    #         item['aqi'] = node.xpath('./td[2]/text()').extract_first()
    #         item['level'] = node.xpath('./td[3]/text()').extract_first()
    #         item['pm2_5'] = node.xpath('./td[4]/text()').extract_first()
    #         item['pm10'] = node.xpath('./td[5]/text()').extract_first()
    #         item['so2'] = node.xpath('./td[6]/text()').extract_first()
    #         item['co'] = node.xpath('./td[7]/text()').extract_first()
    #         item['no2'] = node.xpath('./td[8]/text()').extract_first()
    #         item['o3'] = node.xpath('./td[9]/text()').extract_first()
    #         yield item
