import React from "react";
import { useState } from "react";

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
  const [predictedLabel, setPredictedLabel] = useState(10);
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/members2");
      const jsonData = await response.json();
      setData(jsonData);

      if (jsonData.predicted_class !== undefined) {
        const classToLabel = {
          0: "<50% narrowing",
          1: ">50% narrowing",
        };
        const newPredictedLabel = classToLabel[jsonData.predicted_class];

        setPredictedLabel(newPredictedLabel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      h_age: inputValuesH.h_age,
      h_sex: inputValuesH.h_sex,
      h_cp: inputValuesH.h_cp,
      h_trestbps: inputValuesH.h_trestbps,
      h_chol: inputValuesH.h_chol,
      h_fbs: inputValuesH.h_fbs,
      h_restecg: inputValuesH.h_restecg,
      h_thalach: inputValuesH.h_thalach,
      h_exang: inputValuesH.h_exang,
      h_oldpeak: inputValuesH.h_oldpeak,
      h_slope: inputValuesH.h_slope,
      h_ca: inputValuesH.h_ca,
      h_thal: inputValuesH.h_thal,
    };

    console.log("Data to Send", dataToSend);

    try {
      const response = await fetch("http://127.0.0.1:5000/members2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const data = await response.json();

        if (data.message) {
          console.log("Success", data.message);
          console.log("Predicted Class", data.predicted_class);

          const classToLabel = {
            0: "<50% narrowing",
            1: ">50% narrowing",
          };

          const newPredictedLabel = classToLabel[data.predicted_class];

          setPredictedLabel(newPredictedLabel);
        } else {
          console.error("Error: Unexcepted response format");
        }
      } else {
        const errorData = await response.json();
        console.error("Error", errorData);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    let parsedValue;

    if (type === "number") {
      parsedValue =
        name === "h_oldpeak" ? parseFloat(value) : parseInt(value, 10);
    } else {
      parsedValue = parseInt(value, 10);
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  return (
    <div>
      <h1>Heart Disease Page</h1>
      <h1>{data.members}</h1>
      <p>This is the Heart Disease page content.</p>
      <p>Predicted class: {predictedLabel}</p>
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
      <input
        type="number"
        name="h_ca"
        placeholder="Enter a value"
        value={inputValuesH.h_ca}
        onChange={handleInputChange}
        min="0"
        max="3"
      />

      <p>Thal</p>
      <select
        name="h_thal"
        value={inputValuesH.h_thal}
        onChange={handleInputChange}
      >
        <option value={3}>Normal</option>
        <option value={6}>Fixed Defect</option>
        <option value={7}>Reversible Defect</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <p>Predicted Obesity Level: {predictedLabel}</p>
    </div>
  );
}

export default HeartDisease;
