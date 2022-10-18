from django.urls import path

from . import views


urlpatterns = [
    path('', views.todo_list_handle),
    path('<int:id>/', views.todo_list_with_id_handle),
]