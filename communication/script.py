import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tarfile
import os
import shutil
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.utils import to_categorical
from keras.regularizers import l2
from tensorflow.keras.models import load_model
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  

script_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(script_dir, 'OBModel.h5')
model_path_h = os.path.join(script_dir, 'HModel-2.h5')
model_path_b = os.path.join(script_dir, 'BM.h5')

model_b = load_model(model_path_b)
model_h = load_model(model_path_h)
model = load_model(model_path)

gender = int(input("Input your gender, 0 male, 1 female: "))
age = float(input("Input your age: "))
weight = float(input("Input your weight in kg: "))
height = float(input("Input your height in meters: "))
family_history = int(input("Do you have family history with obesity? 0 no, 1 yes: "))
favc = int(input("Do you frequently consume high-calorie foods? 0 no, 1 yes: "))
fcvc = int(input("Do you have frequent consumption of vegetables and fruits? 0 no, 1 yes: "))
ncp = int(input("What are your number of main meals? From 1 (1-2) to 4 (more than 4): "))
smoke = int(input("Do you smoke? 0 no, 1 yes: "))
caec = float(input("Do you consume foods between meals? 0 (little) 3 (a lot): "))
ch20 = float(input("What is your water consumption? 1.0 (less than a liter) 3.0 (more than 2 liters): "))
calc = int(input("How frequently do you consume alcohol? 0 (none) 3 (a lot): "))
scc = int(input("Do you monitor your calories? 0 no, 1 yes: "))
faf = int(input("What is your physical activity per week? 0 (none) to 3 (4-5 days or more): "))
tue = float(input("What is your time using devices? 0.0 (0-2 hours) 2.0 (5+ hours): "))
mtrans = int(input("What transportation do you mainly use? 0 (car), 1 (motorbike), 2 (bike), 3 (public transport), 4 (walk): "))

new_input_data = pd.DataFrame({
    'Age': [age],
    'Weight': [weight],
    'Height': [height]
})

min_max_values = {
    'Age': {'min': 14.0, 'max': 61.0},
    'Weight': {'min': 39.0, 'max': 173.0},
    'Height': {'min': 1.45, 'max': 1.98}
}


def scale_input_data(input_data, min_max_values, desired_min, desired_max):
    scaled_data = input_data.copy()
    for column, values in min_max_values.items():
        min_value = values['min']
        max_value = values['max']
        # Scale the input data using the provided min and max values
        scaled_data[column] = ((scaled_data[column] - min_value) / (max_value - min_value)) * (desired_max - desired_min) + desired_min
    print(scaled_data)
    return scaled_data

scaled_input_data = scale_input_data(new_input_data, min_max_values, 0, 5)
input_age = scaled_input_data.at[0, "Age"]
input_height = scaled_input_data.at[0, "Height"]
input_weight = scaled_input_data.at[0, "Weight"]

input_data = np.array([[gender, input_age, input_height, input_weight, family_history, favc, fcvc, ncp, caec, smoke, ch20, scc, faf, tue, calc, mtrans]])
predictions = model.predict(input_data)
print(predictions)
predicted_class = np.argmax(predictions, axis=1)
print(predicted_class)

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
print(predicted_label)

h_age = int(input("Input your age: "))
h_sex = int(input("Input your sex, 0 female 1 male: "))
h_cp = int(input("What is your chest pain type, 1 typical angina, 2 atypical angina, 3 non-anginal pain, 4 asymptomatic: "))
h_trestbps = int(input("What is your resting blood pressure (int mm Hg on admission to the hospital): "))
h_chol = int(input("What is your serum cholestoral in mg/dl: "))
h_fbs = int(input("Is your fasting blood sugar > 120 mg/dl, 0 no, 1 yes: "))
h_restecg = int(input("What are your resting electrocardiographic results, 0 normal, 1 ST-T wave abnormality, 2 showing probable or definite left ventricular hypertropy by Estes' criteria: "))
h_thalach = int(input("Maximum heart rate achieved: "))
h_exang = int(input("Exercised induced angina, 0 no, 1 yes: "))
h_oldpeak = float(input("ST depression induced by exercise relative to rest: "))
h_slope = int(input("The slope of the peak exercise ST segment, 1 upsloping, 2 flat, 3 downsloping: "))
h_ca = int(input("Number of major vessels (0-3) colored by flourosopy: "))
h_thal = int(input("Thal, 3 normal, 6 fixed defect, 7 reversable defect: "))

input_data_h = np.array([[h_age, h_sex, h_cp, h_trestbps, h_chol, h_fbs, h_restecg, h_thalach, h_exang, h_oldpeak, h_slope, h_ca, h_thal]])
predictions = model_h.predict(input_data_h)
print(predictions)

predicted_class_h = np.argmax(predictions, axis=1)
print(predicted_class_h)

class_labels_h = {
    0: '<50% diameter narrowing',
    1: '>50% diameter narrowing',
    2: '>50% diameter narrowing',
    3: '>50% diameter narrowing',
    4: '>50% diameter narrowing'
}

predicted_label_h = class_labels_h.get(predicted_class_h[0])
print(predicted_label_h)

b_age = int(input("What is your age: 1-9 for decade: "))
b_menopause = int(input("Menopause status: less than 40 (0), greater than or equal to 40 (1), premenopause (2): "))
b_tumor_size = int(input("Tumour size: 0-4mm(0), 5-9mm(1), 10-14mm(2), etc: "))
b_inv_nodes = int(input("Involved lymph nodes: 0-2(0), 3-5(1), 6-8(2), etc: "))
b_node_caps = int(input("Penetrated the capsule of at least one lymph node: 0 no, 1 yes: "))
b_deg_malig = int(input("Degree of maligency: Grade 1 (1) - Grade 3 (3): "))
b_breast = int(input("Breast: left 0, right 1: "))
b_breast_quad = int(input("Breast quad: left-up 1, left-low 2, right-up 3, right-low 4, central 5: "))
b_irradiat = int(input("Radiation therapy used: 0 no, 1 yes: "))

input_data_b = np.array([[b_age, b_menopause, b_tumor_size, b_inv_nodes, b_node_caps, b_deg_malig, b_breast, b_breast_quad, b_irradiat]])
predictions = model_b.predict(input_data_b)
print(predictions)

predicted_class_b = np.argmax(predictions, axis=1)
print(predicted_class_b)

class_labels_b = {
    0: "No reaccurance events", 
    1: "reaccurance events"
}

predicted_label_b = class_labels_b.get(predicted_class_b[0])
print(predicted_label_b)