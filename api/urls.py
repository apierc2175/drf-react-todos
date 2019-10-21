from django.urls import path

from .views import TodoListAPIView, TodoCreateAPIView


app_name = 'api'

urlpatterns = [
    path('todos/new/', TodoCreateAPIView.as_view(), name='todo_create'),
    path('todos/', TodoListAPIView.as_view(), name="todos_list"),
]
