# from flask import Flask, render_template
# from gevent import pywsgi

# app = Flask(__name__)
# app.jinja_env.auto_reload = True
# app.config['TEMPLATES_AUTO_RELOAD'] = True


# @app.route('/')
# def index():
#     return 'Hello World ...'


# if __name__ == '__main__':
#     # server = pywsgi.WSGIServer(('0.0.0.0', 12345), app)
#     # server.serve_forever()
#     app.run(host='0.0.0.0', port=12345, debug=True)
from core import Application
import config
import app as a

app = Application(__name__)

app.configuration({
    "config": config,
    "app": [a]
})


@app.route('/')
def index():
    return 'Hello World ...'


app.bootstrap()
