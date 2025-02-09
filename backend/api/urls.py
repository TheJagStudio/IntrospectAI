from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("generate/", views.generate, name="generate"),
    path("modules/", views.list_modules, name="list_modules"),
    path("session-maker/", views.session_maker, name="session_maker"),
    path("session/<str:sessionId>/", views.get_session, name="get_session"),
]