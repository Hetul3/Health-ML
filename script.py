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