from flask import Blueprint

bp = Blueprint('/test', __name__, url_prefix='/test')


@bp.route('/')
def index():
    return '<h1>Hello, this is test blueprint</h1>'
