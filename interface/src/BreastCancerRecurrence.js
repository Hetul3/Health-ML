import React from "react";
import { useState, useEffect } from "react";

function BreastCancerRecurrence() {
  const [inputValuesB, setInputValues] = useState({
    b_age: 0,
    b_menopause: 0,
    b_tumor_size: 0,
    b_inv_nodes: 0,
    b_node_cap: 0,
    b_deg_malig: 0,
    b_breast: 0,
    b_breast_quad: 0,
    b_irradiat: 0,
  });

  const [predictedLabel, setPredictedLabel] = useState(10);
  const [data, setData] = useState({});
  const [currentForm, setCurrentForm] = useState(1);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const MAX_FORMS = 9;

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
            <p className="question-p">What is your age</p>
            <input
              type="number"
              name="b_age"
              placeholder="Enter a value"
              value={inputValuesB.b_age}
              onChange={handleInputChange}
              min="30"
              max="100"
            />
            {/* ... other inputs for Form 1 */}
          </div>
        );
      case 2:
        return (
          <div className="question-div">
            <p className="question-p">What is your Menopause status</p>
            <select
              name="b_menopause"
              value={inputValuesB.b_menopause}
              onChange={handleInputChange}
            >
              <option value={0}>Less than 40</option>
              <option value={1}>Greater than or equal to 40</option>
              <option value={2}>Premenopause</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 3:
        return (
          <div className="question-div">
            <p className="question-p">What is the tumour size</p>
            <input
              type="number"
              name="b_tumor_size"
              placeholder="Enter a value"
              value={inputValuesB.b_tumor_size}
              onChange={handleInputChange}
              min="0"
              max="59"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 4:
        return (
          <div className="question-div">
            <p className="question-p">What are the Involved Lymph Nodes</p>
            <input
              type="number"
              name="b_inv_nodes"
              palceholder="Enter a value"
              value={inputValuesB.b_inv_nodes}
              onChange={handleInputChange}
              min="0"
              max="39"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 5:
        return (
          <div className="question-div">
            <p className="question-p">Has it Penetrated the Capsule of at Least One Lymph Node</p>
            <select
              name="b_node_cap"
              value={inputValuesB.b_node_cap}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 6:
        return (
          <div className="question-div">
            <p className="question-p">Degree of Maligency</p>
            <select
              name="b_deg_malig"
              value={inputValuesB.b_deg_malig}
              onChange={handleInputChange}
            >
              <option value={0}>Grade 1</option>
              <option value={1}>Grade 2</option>
              <option value={2}>Grade 3</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 7:
        return (
          <div className="question-div">
            <p className="question-p">Which Breast Has Been Impacted</p>
            <select
              name="b_breast"
              value={inputValuesB.b_breast}
              onChange={handleInputChange}
            >
              <option value={0}>Left</option>
              <option value={1}>Right</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 8:
        return (
          <div className="question-div">
            <p className="question-p">Which Quad Has Been Impacted</p>
            <select
              name="b_breast_quad"
              value={inputValuesB.b_breast_quad}
              onChange={handleInputChange}
            >
              <option value={1}>Left-Up</option>
              <option value={2}>Left-Low</option>
              <option value={3}>Right-Up</option>
              <option value={4}>Right-Low</option>
              <option value={5}>Central</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 9:
        return (
          <div className="question-div">
            <p className="question-p">Was Radiation Therapy Used?</p>
            <select
              name="b_irradiat"
              value={inputValuesB.b_irradiat}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            {/* ... other inputs for Form 2 */}
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
      const response = await fetch("http://127.0.0.1:5000/members3");
      const jsonData = await response.json();
      setData(jsonData);

      if (jsonData.predicted_class !== undefined) {
        const classToLabel = {
          0: "No reaccurance events",
          1: "Reaccurance events",
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
      b_age: inputValuesB.b_age,
      b_menopause: inputValuesB.b_menopause,
      b_tumor_size: inputValuesB.b_tumor_size,
      b_inv_nodes: inputValuesB.b_inv_nodes,
      b_node_cap: inputValuesB.b_node_cap,
      b_deg_malig: inputValuesB.b_deg_malig,
      b_breast: inputValuesB.b_breast,
      b_breast_quad: inputValuesB.b_breast_quad,
      b_irradiat: inputValuesB.b_irradiat,
    };

    console.log("Data to Send", dataToSend);

    try {
      const response = await fetch("http://127.0.0.1:5000/members3", {
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
          setSubmitButtonClicked(true);

          const classToLabel = {
            0: "No reaccurance events",
            1: "Reaccurance events",
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
    parsedValue = parseInt(value, 10);

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  return (
    <div>
      <h1 className="page-header">Breast Cancer Reaccurance</h1>

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
       <p className={`predicted-value ${predictedLabel ? 'show' : ''}`}>Predicted class: {predictedLabel}</p>
      )}
    </div>
  );
}

export default BreastCancerRecurrence;
