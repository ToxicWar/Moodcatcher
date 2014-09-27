from moodcatcher.models import Mood
from api.moods.serializers import MoodSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status


class MoodList(viewsets.ModelViewSet):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

