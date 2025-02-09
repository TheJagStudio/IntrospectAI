from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .utils import generate_ai_response
from .models import AIModule, User, Session
import uuid

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
@require_http_methods(["POST"])
def generate(request):
    try:
        data = json.loads(request.body)
        messages = data.get("messages")
        system = data.get("system")

        if not messages:
            return JsonResponse(
                {"status": "error", "message": "Prompt is required"}, status=400
            )

        result = generate_ai_response(messages,system)
        return JsonResponse(result)
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


@require_http_methods(["GET"])
def list_modules(request):
    try:
        modules = AIModule.objects.all()
        modules_list = []
        for module in modules:
            modules_list.append(
                {
                    "id": module.id,
                    "avatarId": module.avatarId,
                    "knowledgeId": module.knowledgeId,
                    "name": module.name,
                    "role": module.role,
                    "system": module.system,
                    "description": module.description,
                    "profileImg": module.profileImg,
                    "created_at": module.created_at,
                    "updated_at": module.updated_at,
                }
            )
        return JsonResponse({"status": "success", "modules": modules_list})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def session_maker(request):
    try:
        data = json.loads(request.body)
        user = data.get("user")
        moduleId = data.get("moduleId")
        findUser = User.objects.filter(uid=user["uid"])
        if not findUser:
            newUser = User.objects.create(
                uid=user["uid"],
                name=user["displayName"],
                email=user["email"],
                avatar=user["photoURL"],
            )
            newUser.save()
        else:
            newUser = findUser[0]

        module = AIModule.objects.get(id=moduleId)
        newSession = Session()
        newSession.uuid = str(uuid.uuid4())
        newSession.conversation = []
        newSession.module = module
        newSession.user = newUser
        newSession.save()

        return JsonResponse(
            {
                "status": "success",
                "message": "New session created",
                "sessionId": newSession.uuid,
            }
        )
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


@require_http_methods(["GET"])
def get_session(request, sessionId):
    try:
        session = Session.objects.get(uuid=sessionId)
        id = session.id
        uuid = session.uuid
        conversation = session.conversation
        created_at = session.created_at
        updated_at = session.updated_at
        report = session.report
        module = {
            "avatarId": session.module.avatarId,
            "knowledgeId": session.module.knowledgeId,
            "name": session.module.name,
            "role": session.module.role,
            "system": session.module.system,
            "description": session.module.description,
            "created_at": session.module.created_at,
            "updated_at": session.module.updated_at,
            "profileImg": session.module.profileImg,
        }
        user = session.user.name
        return JsonResponse(
            {
                "status": "success",
                "id": id,
                "uuid": uuid,
                "conversation": conversation,
                "created_at": created_at,
                "updated_at": updated_at,
                "report": report,
                "module": module,
                "user": user,
            }
        )
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
