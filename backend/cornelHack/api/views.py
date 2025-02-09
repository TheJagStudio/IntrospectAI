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
        sessionId = data.get("sessionId")
        
        
        if not messages:
            return JsonResponse(
                {"status": "error", "message": "Prompt is required"}, status=400
            )

        result = generate_ai_response(messages,system)
        session = Session.objects.get(uuid=sessionId)
        messages.append({"role": "assistant", "content": [{"type": "text", "text": result["response"]}]})
        session.conversation = messages
        session.save()
        return JsonResponse(result)
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def generate_report(request):
    try:
        data = json.loads(request.body)
        messages = data.get("messages")
        sessionId = data.get("sessionId")
        reportSystem = data.get("reportSystem")
        
        if not messages:
            return JsonResponse(
                {"status": "error", "message": "Prompt is required"}, status=400
            )
        
        messages.append({"role": "user", "content": [{"type": "text", "text": reportSystem}]})

        result = generate_ai_response(messages,reportSystem,max_tokens=2048)
        session = Session.objects.get(uuid=sessionId)
        session.report = result["response"]
        session.isReported = True
        session.save()
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
                    "reportSystem": module.reportSystem,
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
            "reportSystem": session.module.reportSystem,
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
                "isReported": session.isReported,
                "module": module,
                "user": user,
            }
        )
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def list_sessions(request):
    try:
        data = json.loads(request.body)
        user = data.get("user")
        sessions = Session.objects.filter(user__uid=user["uid"])
        sessions_list = []
        for session in sessions:
            sessions_list.append(
                {
                    "id": session.id,
                    "uuid": session.uuid,
                    "conversation": session.conversation,
                    "created_at": session.created_at,
                    "updated_at": session.updated_at,
                    "report": session.report,
                    "isReported": session.isReported,
                    "module": {
                        "avatarId": session.module.avatarId,
                        "knowledgeId": session.module.knowledgeId,
                        "name": session.module.name,
                        "role": session.module.role,
                        "system": session.module.system,
                        "reportSystem": session.module.reportSystem,
                        "description": session.module.description,
                        "created_at": session.module.created_at,
                        "updated_at": session.module.updated_at,
                        "profileImg": session.module.profileImg,
                    },
                    "user": session.user.name,
                }
            )
        return JsonResponse({"status": "success", "sessions": sessions_list})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def delete_session(request):
    try:
        data = json.loads(request.body)
        session_id = data.get("sessionId")
        
        if not session_id:
            return JsonResponse({"status": "error", "message": "Session ID is required"}, status=400)
            
        session = Session.objects.get(uuid=session_id)
        session.delete()
        
        return JsonResponse({
            "status": "success",
            "message": "Session deleted successfully"
        })
    except Session.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Session not found"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
