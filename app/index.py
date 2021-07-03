import sys
import os
from flask import Blueprint
import requests

bp = Blueprint('/', __name__, url_prefix='/')


@bp.route('/')
def index():
    resp = requests.get(url='https://bbs.bbicn.com/')
    script = os.path.join(
        '/'.join(sys.argv[0].split('/')[:-1]), 'script/inputs.js')
    f = open(script, 'r')
    content = f.read()
    f.close()
    return ''.join([
        '<div id="pcroot">',
        '<div id="pcleft">',
        '</div>',
        '<div id="pccontent">',
        resp.text,
        '</div>',
        '</div>',
        '<script type="text/javascript">',
        content,
        '</script>',
    ])
