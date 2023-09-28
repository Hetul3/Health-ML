import React from "react";

function HeartDisease() {
  const [inputValuesH, setInputValues] = useState({
    h_age: 0,
    h_sex: 0,
    h_cp: 0,
    h_trestbps: 0,
    h_chol: 0,
    h_fbs: 0,
    h_restecg: 0,
    h_thalach: 0,
    h_exang: 0,
    h_oldpeak: 0.0,
    h_slope: 0,
    h_ca: 0,
    h_thal: 0,
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  return (
    <div>
      <h1>Heart Disease Page</h1>
      <p>This is the Heart Disease page content.</p>

      <p>Input your Age</p>
      <input
        type="number"
        name="h_age"
        placeholder="Enter a value"
        value={inputValuesH.h_age}
        onChange={handleInputChange}
        min="0"
        max="100"
      />

      <p>Input you Sex</p>
      <select
        name="h_sex"
        value={inputValuesH.h_sex}
        onChange={handleInputChange}
      >
        <option value={0}>Female</option>
        <option value={1}>Male</option>
      </select>

      <p>What is your Chest Pain Type</p>
      <select
        name="h_cp"
        value={inputValuesH.h_cp}
        onChange={handleInputChange}
      >
        <option value={1}>Typical Angina</option>
        <option value={2}>Atypical Angina</option>
        <option value={3}>Non-Anginal Pain</option>
        <option value={4}>Asympotomatic</option>
      </select>

      <p>What is your Resting Blood Pressure {"(Systolic)"}</p>
      <input
        type="number"
        name="h_trestbps"
        placeholder="Enter a value"
        value={inputValuesH.h_trestbps}
        onChange={handleInputChange}
        min="0"
        max="200"
      />

      <p>What is your Serum Cholestoral {"(Triglycerides)"}</p>
      <input
        type="number"
        name="h_chol"
        placeholder="Enter a value"
        value={inputValuesH.h_chol}
        onChange={handleInputChange}
        min="70"
        max="600"
      />

      <p>Is your Fasting Blood Sugar {">"} 120 mg/dl</p>
      <select
        name="h_fbs"
        value={inputValuesH.h_fbs}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>What are your Resting Electrocardiographic Results</p>
      <select
        name="h_restecg"
        value={inputValuesH.h_restecg}
        onChange={handleInputChange}
      >
        <option value={0}>Normal</option>
        <option value={1}>ST-T Wave Abnormality</option>
        <option value={2}>
          Showing Probable or Definit Left Ventricular Hypertropy by Estes'
          Criteria
        </option>
      </select>

      <p>Maximum Heart Rate Achieved Recently</p>
      <input
        type="number"
        name="h_thalach"
        placeholder="Enter a value"
        value={inputValuesH.h_thalach}
        onChange={handleInputChange}
        min="20"
        max="220"
      />

      <p>Exercised Induced Angina</p>
      <select
        name="h_exang"
        value={inputValuesH.h_exang}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>ST Depression Induced by Exercise Relative to Rest</p>
      <input
        type="number"
        step="0.1"
        name="h_oldpeak"
        placeholder="Enter a value"
        value={inputValuesH.h_oldpeak}
        onChange={handleInputChange}
        min="0"
        max="3"
      />

      <p>The slope of the peak Exercise ST Segment</p>
      <select
        name="h_slope"
        value={inputValuesH.h_slope}
        onChange={handleInputChange}
      >
        <option value={1}>Unsloping</option>
        <option value={2}>Flat</option>
        <option value={3}>Downsloping</option>
      </select>

      <p>Number of Major Vessels Colored by Flouroscopy</p>
      <p>Thal</p>
    </div>
  );
}

export default HeartDisease;
