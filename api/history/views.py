# coding: utf-8
from __future__ import unicode_literals
from api.moods.serializers import MoodSerializer
from moodcatcher.models import Mood
from rest_framework import permissions
from rest_framework.generics import ListAPIView


class HistoryView(ListAPIView):
    model = Mood
    serializer_class = MoodSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        queryset = super(HistoryView, self).get_queryset()
        if self.request.QUERY_PARAMS.has_key('received'):
            return queryset.filter(received=self.request.user).order_by('-posted')
        return queryset.filter(author=self.request.user).order_by('-posted')
