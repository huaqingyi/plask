from flask import Blueprint

bp = Blueprint('/', __name__, url_prefix='/')


@bp.route('/')
def index():
    return '<h1>Hello, this is index blueprint</h1>'
