import os
from flask import Flask
from config.app import Configuration
import pkgutil


def walkFile(file):
    pys = []

    for root, dirs, files in os.walk(file):
        # root 表示当前正在访问的文件夹路径
        # dirs 表示该文件夹下的子目录名list
        # files 表示该文件夹下的文件list
        # 遍历文件
        for f in files:
            file_ext = f.rsplit('.', maxsplit=1)
            if not f.startswith('__') and file_ext[1] == 'py':
                print(os.path.join(root, f))
                # pys.append(os.path.join(root, f))

        # 遍历所有的文件夹
        for d in dirs:
            if not d.startswith('__'):
                pys.append(os.path.join(root, d))
            # print(os.path.join(root, d))

    return pys


class Application(Flask):

    _appliconfig = {}

    @property
    def appliconfig(self):
        return self._appliconfig

    @appliconfig.setter
    def appliconfig(self, value):
        self._appliconfig = value

    def parsebp(self, p: str, package: str):
        ms = walkFile(p)
        ms.append(p)
        # bps = []
        for m in ms:
            mapper = (package +
                      m.replace(p, '')).split('/')
            # 要主要这个文件目录参数是一个列表
            for finder, name, ispck in pkgutil.iter_modules([m], '.'.join(mapper[:-1]) + '.'):
                loader = finder.find_module(name)  # 返回一个loader对象或者None。
                # 返回一个module对象或者raise an exception
                mod = loader.load_module(name)
                if hasattr(mod, 'bp'):
                    self.register_blueprint(mod.bp)

    def parseconf(self, config):
        confs = {}
        env = os.getenv('FLASK_CONFIG')
        mapper = hasattr(config, 'env') or None
        mapper = mapper or env or 'dev'
        for conf in dir(config['config']):
            c = getattr(config['config'], conf)
            if not conf.startswith('__') and hasattr(c, 'Configuration'):
                configuration = c.Configuration()
                if hasattr(configuration, mapper):
                    used = getattr(configuration, mapper)
                    used()
                confs[conf] = configuration

        self.appliconfig = confs
        return confs

    def configuration(self, config):

        self.parseconf(config)

        for pack in config['app']:
            for p in pack.__path__:
                self.parsebp(p, pack.__package__)

    def bootstrap(self):
        self.config.from_object(self.appliconfig['app'])
        self.run()
