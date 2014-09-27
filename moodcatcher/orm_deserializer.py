# coding: utf-8
import os, shutil
from django.utils.importlib import import_module
from django.db import connection
from django.core.management import call_command
from django.conf import settings


class FakeORMObject(object):
    class _meta:
        db_table = 'django_content_type'
        local_fields = []
        many_to_many = []


class FakeWrapper(object):
    def __init__(self):
        self.object = FakeORMObject()
        
    def save(self, **kwargs):
        pass


class FakeFakeWrapper(FakeWrapper):
    def __init__(self, mod_name):
        self.mod_name = mod_name
        super(FakeFakeWrapper, self).__init__()
    
    def save(self, **kwargs):
        print 'This one was faked! (%s)' % self.mod_name


def get_insert_count():
    return len([q for q in connection.queries if q['sql'].startswith('INSERT')])


class Deserializer(object):
    def __init__(self, stream_or_string, **options):
        connection.use_debug_cursor = True
        fixture = stream_or_string
        path = fixture.name
        base, fixture_name = os.path.split(path)
        base, fixture_const = os.path.split(base)
        base, appname = os.path.split(base)
        fixture_name  = os.path.splitext(fixture_name)[0]
        mod = import_module('%s.%s.%s' % (appname, fixture_const, fixture_name))
        filesdir = os.path.join(os.path.split(mod.__file__)[0], 'files')
        if os.path.exists(filesdir):
            for file_ in os.listdir(filesdir):
                src = os.path.join(filesdir, file_)
                dst = os.path.join(settings.MEDIA_ROOT, file_)
                shutil.copy(src, dst)
        
        if hasattr(mod, 'deps'):
            for dep in mod.deps:
                call_command('loaddata', dep)
        if hasattr(mod, 'load_data'):
            before = get_insert_count()
            mod.load_data()
            after = get_insert_count()
            self.objlist = [FakeWrapper()]*(after-before)
        else:
            self.objlist = []
        if not self.objlist:
            self.objlist = [FakeFakeWrapper(mod.__name__)]
        self.current = 0
        
    def __iter__(self):
        for obj in self.objlist:
            yield obj


class Serializer(object):
    internal_use_only = False
