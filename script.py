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

new_input_data = pd.DataFrame({
    'Age': [22.0],
    'Weight': [89.8],
    'Height': [1.78]
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

input_data = np.array([[1, input_age, input_height, input_weight, 0, 0, 2.0, 1.0, 2, 0, 2.0, 0, 0.0, 0.0, 2, 3]])
predictions = model.predict(input_data)
print(predictions)
predicted_class = np.argmax(predictions, axis=1)
print(predicted_class)

print("test")