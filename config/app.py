class AppConfiguration():
    DEBUG = False

    def dev(self):
        self.DEBUG = True
    
    def prod(self):
        self.DEBUG = False
