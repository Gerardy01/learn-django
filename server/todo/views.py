from cgitb import reset
import json
from turtle import title
from unicodedata import name
from django.http import HttpResponse, JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .models import TodoList

# Create your views here.

@csrf_exempt
def todo_list_handle(request):
    if request.method == "GET":
        try:
            todo_list_data = TodoList.objects.all().values()

            payload_data = []
            for data in todo_list_data:
                payload_data.append(data)

            return JsonResponse({
                'result': 'success',
                'data': payload_data
            }, status=200)
        except:
            return JsonResponse({
                'result': 'failed',
                'msg': 'something wrong'
            }, status=500)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            
            title_data = data.get('title')
            description_data = data.get('description')
            
            if len(title_data) == 0 or title == "":
                return JsonResponse({
                    'result': 'failed',
                    'msg': 'title is required'
                }, status=400)

            TodoList.objects.create(title=title_data, description=description_data)

            return JsonResponse({
                'result': 'success'
            }, status=200)
        except:
            return JsonResponse({
                'result': 'failed',
                'msg': 'something wrong'
            }, status=500)
    else:
        return JsonResponse({
            'status': 'failed',
            'msg': 'wrong Http method'
        }, status=404)


@csrf_exempt
def todo_list_with_id_handle(request, **kwargs):
    if request.method == 'DELETE':
        try:
            
            todo_list_id = kwargs.get('id')

            list_data = TodoList.objects.filter(id=todo_list_id).delete()

            if list_data[0] == 0:
                return JsonResponse({
                    'result': 'failed',
                    'msg': 'data not found'
                }, status=404)

            return JsonResponse({
                    'result': 'success',
                    'msg': 'data has been deleted'
                }, status=200)
        except:
            return JsonResponse({
                'result': 'failed',
                'msg': 'something wrong'
            }, status=500)

        


