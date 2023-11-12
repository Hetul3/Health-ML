from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  

app = Flask(__name__)
CORS(app, resources={r"/members": {"origins": "http://localhost:3000"}, r"/members2": {"origins": "http://localhost:3000"}, r"/members3": {"origins": "http://localhost:3000"}})

ob_model_path = os.path.join(os.path.dirname(__file__), '..', 'OBModel.h5')
hd_model_path = os.path.join(os.path.dirname(__file__), '..', 'HModel-2.h5')
b_model_path = os.path.join(os.path.dirname(__file__), '..', 'BM.h5')
ob_model = load_model(ob_model_path)
hd_model = load_model(hd_model_path)
b_model = load_model(b_model_path)

received_data = {"members": "Hello Testing"}
recieved_data_h = {"members2": "Hello Testing again"}
recieved_data_b = {"members3": "Hellow Testing again"}

def scale_to_range(value, min_value, max_value, target_min, target_max):
    scaled_value = ((value - min_value) / (max_value - min_value)) * (target_max - target_min) + target_min
    return np.clip(scaled_value, target_min, target_max)

@app.route('/members', methods=['GET', 'POST'])
def members():
    if request.method == 'GET':
        return jsonify(received_data)

    elif request.method == 'POST':
        try:
            request_data = request.get_json()
            
            o_sex = request_data.get('o_sex', 0)
            o_age = request_data.get('o_age', 0.0)
            o_weight = request_data.get('o_weight', 0.0)
            o_height = request_data.get('o_height', 0.0)
            o_family_history = request_data.get('o_family_history', 0)
            o_favc = request_data.get('o_favc', 0)
            o_fcvc = request_data.get('o_fcvc', 0)
            o_ncp = request_data.get('o_ncp', 0)
            o_smoke = request_data.get('o_smoke', 0)
            o_caec = request_data.get('o_caec', 0.0)
            o_ch20 = request_data.get('o_ch20', 0.0)
            o_calc = request_data.get('o_calc', 0)
            o_scc = request_data.get('o_scc', 0)
            o_faf = request_data.get('o_faf', 0)
            o_tue = request_data.get('o_tue', 0.0)
            o_mtrans = request_data.get('o_mtrans', 0)
            
            scaled_age = scale_to_range(o_age, 14, 61, 0, 5)
            scaled_weight = scale_to_range(o_weight, 39, 173, 0, 5)
            scaled_height = scale_to_range(o_height, 1.45, 1.98, 0, 5)

            # Apply the OBModel to get predictions
            input_data_ob = np.array([[o_sex, scaled_age, scaled_height, scaled_weight, o_family_history, o_favc, o_fcvc, o_ncp, o_caec, o_smoke, o_ch20, o_scc, o_faf, o_tue, o_calc, o_mtrans]])
            predictions = ob_model.predict(input_data_ob)
            predicted_class = int(np.argmax(predictions, axis=1)[0])

            # Update received_data with the prediction
            received_data.update({"predicted_class": predicted_class})

            return jsonify({
                "message": "Data received and processed successfully",
                "predicted_class": predicted_class
            })
            
        except Exception as e:
            return jsonify({"error": str(e)}), 400  # Return a 400 Bad Request status on error

@app.route('/members2', methods=['GET', 'POST'])
def members2():
    if request.method == 'GET':
        return jsonify(recieved_data_h)
    
    elif request.method == 'POST':
        try:
            request_data = request.get_json()
            
            h_age = request_data.get('h_age', 0)
            h_sex = request_data.get('h_sex', 0)
            h_cp = request_data.get('h_cp', 0)
            h_trestbps = request_data.get('h_trestbps', 0)
            h_chol = request_data.get('h_chol', 0)
            h_fbs = request_data.get('h_fbs', 0)
            h_restecg = request_data.get('h_restecg', 0)
            h_thalach = request_data.get('h_thalach', 0)
            h_exang = request_data.get('h_exang', 0)
            h_oldpeak = request_data.get('h_oldpeak', 0.0)
            h_slope = request_data.get('h_slope', 0)
            h_ca = request_data.get('h_ca', 0)
            h_thal = request_data.get('h_thal', 0)
            
            input_data_h = np.array([[h_age, h_sex, h_cp, h_trestbps, h_chol, h_fbs, h_restecg, h_thalach, h_exang, h_oldpeak, h_slope, h_ca, h_thal]])
            predictions = hd_model.predict(input_data_h)
            predicted_class = int(np.argmax(predictions, axis=1)[0])
            
            received_data.update({"predicted_class": predicted_class})
            
            return jsonify({
                "message": "Data received and processed successfully h",
                "predicted_class": predicted_class
            })
            
        except Exception as e:
            return jsonify({"error": str(e)}), 400 
        
        
@app.route('/members3', methods=['GET', 'POST'])
def members3():
    if request.method == 'GET':
        return jsonify(recieved_data_b)
    
    elif request.method == 'POST':
        try:
            request_data = request.get_json()
            
            
            b_age = request_data.get('b_age', 0)
            b_menopause = request_data.get('b_menopause', 0)
            b_tumor_size = request_data.get('b_tumor_size', 0)
            b_inv_nodes = request_data.get('b_inv_nodes', 0)
            b_node_cap = request_data.get('b_node_cap', 0)
            b_deg_malig = request_data.get('b_deg_malig', 0)
            b_breast = request_data.get('b_breast', 0)
            b_breast_quad = request_data.get('b_breast_quad', 0)
            b_irradiat = request_data.get('b_irradiat', 0)
            
            b_age = b_age/10
            b_tumor_size = b_tumor_size/5
            b_inv_nodes = b_inv_nodes/3
            
            input_data_b = np.array([[b_age, b_menopause, b_tumor_size, b_inv_nodes, b_node_cap, b_deg_malig, b_breast, b_breast_quad, b_irradiat]])
            predictions = hd_model.predict(input_data_b)
            predicted_class = int(np.argmax(predictions, axis=1)[0])
            
            received_data.update({"predicted_class": predicted_class})
            
            return jsonify({
                "message": "Data received and processed successfully b",
                "predicted_class": predicted_class
            })
            
        except Exception as e:
            return jsonify({"error": str(e)}), 400 
            
            

if __name__ == "__main__":
    app.run(debug=True)