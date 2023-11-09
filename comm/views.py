from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_GET
import numpy as np
import pandas as pd
import os
from tensorflow.keras.models import load_model

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

# Load your pre-trained models here
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path_obesity = os.path.join(script_dir, 'OBModel.h5')
model_path_heart = os.path.join(script_dir, 'HModel-2.h5')
model_path_cancer = os.path.join(script_dir, 'BM.h5')
model_obesity = load_model(model_path_obesity)
model_heart = load_model(model_path_heart)
model_cancer = load_model(model_path_cancer)

def preprocess_and_predict_obesity(gender, age, weight, height, family_history, favc, fcvc, ncp, caec, smoke, ch20, scc, faf, tue, calc, mtrans):
    # Data preprocessing and prediction for obesity
    # Include scaling, encoding, or any other necessary preprocessing
    min_max_values = {
        'Age': {'min': 14.0, 'max': 61.0},
        'Weight': {'min': 39.0, 'max': 173.0},
        'Height': {'min': 1.45, 'max': 1.98}
    }

    input_data = pd.DataFrame({
        'Age': [age],
        'Weight': [weight],
        'Height': [height]
    })

    for column, values in min_max_values.items():
        min_value = values['min']
        max_value = values['max']
        input_data[column] = ((input_data[column] - min_value) / (max_value - min_value)) * 5

    predictions = model_obesity.predict(input_data)
    predicted_class = np.argmax(predictions, axis=1)
    class_labels = {
        0: "Insufficient Weight",
        1: "Normal Weight",
        2: "Overweight 1",
        3: "Overweight 2",
        4: "Obesity 1",
        5: "Obesity 2",
        6: "Obesity 3"
    }
    predicted_label = class_labels.get(predicted_class[0])
    return predicted_label

def preprocess_and_predict_heart_disease(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal):
    # Data preprocessing and prediction for heart disease
    # Include any necessary preprocessing here
    input_data = np.array([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])
    predictions = model_heart.predict(input_data)
    predicted_class = np.argmax(predictions, axis=1)
    class_labels = {
        0: '<50% diameter narrowing',
        1: '>50% diameter narrowing',
        2: '>50% diameter narrowing',
        3: '>50% diameter narrowing',
        4: '>50% diameter narrowing'
    }
    predicted_label = class_labels.get(predicted_class[0])
    return predicted_label

def preprocess_and_predict_breast_cancer(age, menopause, tumor_size, inv_nodes, node_caps, deg_malig, breast, breast_quad, irradiat):
    # Data preprocessing and prediction for breast cancer recurrence
    # Include any necessary preprocessing here
    input_data = np.array([[age, menopause, tumor_size, inv_nodes, node_caps, deg_malig, breast, breast_quad, irradiat]])
    predictions = model_cancer.predict(input_data)
    predicted_class = np.argmax(predictions, axis=1)
    class_labels = {
        0: "No reoccurrence events",
        1: "Reoccurrence events"
    }
    predicted_label = class_labels.get(predicted_class[0])
    return predicted_label

@csrf_exempt
@require_POST
def obesity_prediction(request):
    # Handle POST request to predict obesity
    data = request.POST
    gender = int(data.get('gender'))
    age = float(data.get('age'))
    weight = float(data.get('weight'))
    height = float(data.get('height'))
    family_history = int(data.get('family_history'))
    favc = int(data.get('favc'))
    fcvc = int(data.get('fcvc'))
    ncp = int(data.get('ncp'))
    caec = float(data.get('caec'))
    smoke = int(data.get('smoke'))
    ch20 = float(data.get('ch20'))
    scc = int(data.get('scc'))
    faf = int(data.get('faf'))
    tue = float(data.get('tue'))
    calc = int(data.get('calc'))
    mtrans = int(data.get('mtrans'))

    # Call the preprocessing and prediction function for obesity
    predicted_label = preprocess_and_predict_obesity(gender, age, weight, height, family_history, favc, fcvc, ncp, caec, smoke, ch20, scc, faf, tue, calc, mtrans)

    # Return the prediction result as a JSON response
    response_data = {'predicted_label': predicted_label}
    return JsonResponse(response_data)

@csrf_exempt
@require_POST
def heart_disease_prediction(request):
    # Handle POST request to predict heart disease
    data = request.POST
    age = int(data.get('age'))
    sex = int(data.get('sex'))
    cp = int(data.get('cp'))
    trestbps = int(data.get('trestbps'))
    chol = int(data.get('chol'))
    fbs = int(data.get('fbs'))
    restecg = int(data.get('restecg'))
    thalach = int(data.get('thalach'))
    exang = int(data.get('exang'))
    oldpeak = float(data.get('oldpeak'))
    slope = int(data.get('slope'))
    ca = int(data.get('ca'))
    thal = int(data.get('thal'))

    # Call the preprocessing and prediction function for heart disease
    predicted_label = preprocess_and_predict_heart_disease(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal)

    # Return the prediction result as a JSON response
    response_data = {'predicted_label': predicted_label}
    return JsonResponse(response_data)

@csrf_exempt
@require_POST
def breast_cancer_prediction(request):
    # Handle POST request to predict breast cancer recurrence
    data = request.POST
    age = int(data.get('age'))
    menopause = int(data.get('menopause'))
    tumor_size = int(data.get('tumor_size'))
    inv_nodes = int(data.get('inv_nodes'))
    node_caps = int(data.get('node_caps'))
    deg_malig = int(data.get('deg_malig'))
    breast = int(data.get('breast'))
    breast_quad = int(data.get('breast_quad'))
    irradiat = int(data.get('irradiat'))

    # Call the preprocessing and prediction function for breast cancer recurrence
    predicted_label = preprocess_and_predict_breast_cancer(age, menopause, tumor_size, inv_nodes, node_caps, deg_malig, breast, breast_quad, irradiat)

    # Return the prediction result as a JSON response
    response_data = {'predicted_label': predicted_label}
    return JsonResponse(response_data)