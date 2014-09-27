from moodcatcher.models import Mood
from api.moods.serializers import MoodSerializer
from rest_framework import viewsets


class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

