# coding: utf-8
from __future__ import unicode_literals
from pyramid.view import view_config


class BaseView(object):
    """
    Базовая View

    :param request: Request
    :type request: Request
    """

    # model_class = None
    app_settings = None

    def __init__(self, request, *args, **kwargs):
        self.request = request

    def __call__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs
        return getattr(self, self.request.method.lower())(*args, **kwargs)


@view_config(route_name='home', renderer='static/src/index.pt')
def my_view(request):
    return {'project': 'Moodcatcher'}


class Login(BaseView):
    def get(self):
        return {'test': 'test'}
