"""
URL configuration for communication project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# In your app's urls.py (e.g., "myapp/urls.py")
# In your project's main urls.py (e.g., "communication/urls.py")
from django.urls import path
from . import views  # Import views from the same app

urlpatterns = [
    path('api/endpoint/', views.receive_data, name='receive_data'),
    # Add other URL patterns specific to your app
]
