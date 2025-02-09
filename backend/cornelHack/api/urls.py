from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("generate/", views.generate, name="generate"),
    path("generate-report/", views.generate_report, name="generate_report"),
    path("modules/", views.list_modules, name="list_modules"),
    path("session-maker/", views.session_maker, name="session_maker"),
    path("session/<str:sessionId>/", views.get_session, name="get_session"),
    path("list-sessions/", views.list_sessions, name="list_sessions"),
    path("delete-session/", views.delete_session, name="delete_session"),
]