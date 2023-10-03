# In your app's views.py (e.g., "myapp/views.py")
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from communication import script  # Import script.py

@csrf_exempt
def receive_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Call a function from script.py and pass the data
            result = script.process_data(data)
            # Return a JSON response with the result
            return JsonResponse({'result': result})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
