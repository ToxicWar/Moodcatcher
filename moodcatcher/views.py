from pyramid.view import view_config


@view_config(route_name='home', renderer='static/src/index.pt')
def my_view(request):
    return {'project': 'Moodcatcher'}
