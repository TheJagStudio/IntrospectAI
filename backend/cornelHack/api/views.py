from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .utils import generate_ai_response

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
@require_http_methods(["POST"])
def generate(request):
    try:
        data = json.loads(request.body)
        messages = data.get('messages')
        
        if not messages:
            return JsonResponse({"status": "error", "message": "Prompt is required"}, status=400)
        
        result = generate_ai_response(messages)
        return JsonResponse(result)
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)