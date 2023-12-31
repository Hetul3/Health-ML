import React from "react";
import { useState, useEffect } from "react";

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
  const [currentForm, setCurrentForm] = useState(1);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [predictedProbability, setPredictedProbability] = useState(0.0);
  const MAX_FORMS = 13;

  const handleNext = () => {
    setCurrentForm((prevForm) => prevForm + 1);
  };

  const handleBack = () => {
    setCurrentForm((prevForm) => Math.max(prevForm - 1, 1));
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <div className="question-div">
            <p className="question-p">Input your Age</p>
            <input
              type="number"
              name="h_age"
              placeholder="Enter a value"
              value={inputValuesH.h_age}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>
        );
      case 2:
        return (
          <div className="question-div">
            <p className="question-p">Input your Sex</p>
            <select
              name="h_sex"
              value={inputValuesH.h_sex}
              onChange={handleInputChange}
            >
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div className="question-div">
            <p className="question-p">What is your Chest Pain Type</p>
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
          </div>
        );
      case 4:
        return (
          <div className="question-div">
            <p className="question-p">
              What is your Resting Blood Pressure {"(Systolic)"}
            </p>
            <input
              type="number"
              name="h_trestbps"
              placeholder="Enter a value"
              value={inputValuesH.h_trestbps}
              onChange={handleInputChange}
              min="0"
              max="200"
            />
          </div>
        );
      case 5:
        return (
          <div className="question-div">
            <p className="question-p">
              What is your Serum Cholestoral {"(Triglycerides)"}
            </p>
            <input
              type="number"
              name="h_chol"
              placeholder="Enter a value"
              value={inputValuesH.h_chol}
              onChange={handleInputChange}
              min="70"
              max="600"
            />
          </div>
        );
      case 6:
        return (
          <div className="question-div">
            <p className="question-p">
              Is your Fasting Blood Sugar {">"} 120 mg/dl
            </p>
            <select
              name="h_fbs"
              value={inputValuesH.h_fbs}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        );
      case 7:
        return (
          <div className="question-div">
            <p className="question-p">
              What are your Resting Electrocardiographic Results
            </p>
            <select
              name="h_restecg"
              value={inputValuesH.h_restecg}
              onChange={handleInputChange}
            >
              <option value={0}>Normal</option>
              <option value={1}>ST-T Wave Abnormality</option>
              <option value={2}>
                Showing Probable or Definit Left Ventricular Hypertropy by
                Estes' Criteria
              </option>
            </select>
          </div>
        );
      case 8:
        return (
          <div className="question-div">
            <p className="question-p">Maximum Heart Rate Achieved Recently</p>
            <input
              type="number"
              name="h_thalach"
              placeholder="Enter a value"
              value={inputValuesH.h_thalach}
              onChange={handleInputChange}
              min="20"
              max="220"
            />
          </div>
        );
      case 9:
        return (
          <div className="question-div">
            <p className="question-p">Exercised Induced Angina</p>
            <select
              name="h_exang"
              value={inputValuesH.h_exang}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        );
      case 10:
        return (
          <div className="question-div">
            <p className="question-p">
              ST Depression Induced by Exercise Relative to Rest
            </p>
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
          </div>
        );
      case 11:
        return (
          <div className="question-div">
            <p className="question-p">
              The slope of the peak Exercise ST Segment
            </p>
            <select
              name="h_slope"
              value={inputValuesH.h_slope}
              onChange={handleInputChange}
            >
              <option value={1}>Unsloping</option>
              <option value={2}>Flat</option>
              <option value={3}>Downsloping</option>
            </select>
          </div>
        );
      case 12:
        return (
          <div className="question-div">
            <p className="question-p">
              Number of Major Vessels Colored by Flouroscopy
            </p>
            <input
              type="number"
              name="h_ca"
              placeholder="Enter a value"
              value={inputValuesH.h_ca}
              onChange={handleInputChange}
              min="0"
              max="3"
            />
          </div>
        );
      case 13:
        return (
          <div className="question-div">
            <p className="question-p">Thal</p>
            <select
              name="h_thal"
              value={inputValuesH.h_thal}
              onChange={handleInputChange}
            >
              <option value={3}>Normal</option>
              <option value={6}>Fixed Defect</option>
              <option value={7}>Reversible Defect</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

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
          console.log("Predicted probaility", data.prediction_probability);
          setSubmitButtonClicked(true);
          const classToLabel = {
            0: "<50% narrowing",
            1: ">50% narrowing",
          };

          const newPredictedLabel = classToLabel[data.predicted_class];
          const predictionProbability = data.prediction_probability;
          const formattedProbability = (predictionProbability * 100).toFixed(1);

          setPredictedProbability(formattedProbability);

          setPredictedLabel(newPredictedLabel);
        } else {
          console.error("Error: Unexpected response format");
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
      <h1 className="page-header">Heart Disease Page</h1>

      {renderForm()}
      <div className="button-container">
        <button
          className="button button-back"
          onClick={handleBack}
          disabled={currentForm === 1}
        >
          Back
        </button>
        {currentForm < MAX_FORMS && (
          <button className="button button-next" onClick={handleNext}>
            Next
          </button>
        )}
        {currentForm === MAX_FORMS && (
          <button className="button button-submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      {submitButtonClicked && (
        <p className={`predicted-value ${predictedLabel ? "show" : ""}`}>
          Predicted class: {predictedLabel}
          <br />
          Model Probability: {predictedProbability}%
        </p>
      )}
    </div>
  );
}

export default HeartDisease;
