from flask import Blueprint

bp = Blueprint('/test/detail', __name__, url_prefix='/test/detail')


@bp.route('/')
def index():
    return '<h1>Hello, this is test detail blueprint</h1>'
