from pyramid.config import Configurator
from . import views


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('Login', 'login')
    config.add_view(
        views.Login,
        route_name='Login',
        permission='get',
        request_method='GET',
        renderer='json'
    )
    config.scan()
    return config.make_wsgi_app()
