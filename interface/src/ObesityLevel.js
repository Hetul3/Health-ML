import React from "react";
import { useState, useEffect } from "react";

function ObesityLevel() {
  const [inputValuesO, setInputValues] = useState({
    o_sex: 0,
    o_age: 0.0,
    o_weight: 0.0,
    o_height: 0.0,
    o_family_history: 0,
    o_favc: 0,
    o_fcvc: 0,
    o_ncp: 0,
    o_smoke: 0,
    o_caec: 0.0,
    o_ch20: 0.0,
    o_calc: 0,
    o_scc: 0,
    o_faf: 0,
    o_tue: 0.0,
    o_mtrans: 0,
  });
  const [predictedLabel, setPredictedLabel] = useState(10);
  const [data, setData] = useState({});
  const [currentForm, setCurrentForm] = useState(1);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [predictedProbability, setPredictedProbability] = useState(0.0);
  const MAX_FORMS = 16;

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
            <p className="question-p">What Is Your Sex</p>
            <select
              name="o_sex"
              value={inputValuesO.o_sex}
              onChange={handleInputChange}
            >
              <option value={1}>Female</option>
              <option value={0}>Male</option>
            </select>
            {/* ... other inputs for Form 1 */}
          </div>
        );
      case 2:
        return (
          <div className="question-div">
            <p className="question-p">Input Your Age</p>
            <input
              type="number"
              name="o_age"
              placeholder="Enter a value"
              value={inputValuesO.o_age}
              onChange={handleInputChange}
              min="18"
              max="100"
              step="1"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 3:
        return (
          <div className="question-div">
            <p className="question-p">Input Your Weight in kg</p>
            <input
              type="number"
              name="o_weight"
              placeholder="Enter a value"
              value={inputValuesO.o_weight}
              onChange={handleInputChange}
              min="30"
              max="250"
              step="1"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 4:
        return (
          <div className="question-div">
            <p className="question-p">What is Your Height in meters</p>
            <input
              type="number"
              step="0.01"
              name="o_height"
              placeholder="Enter a value"
              value={inputValuesO.o_height}
              onChange={handleInputChange}
              min="1"
              max="2.5"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 5:
        return (
          <div className="question-div">
            <p className="question-p">
              Do you Have a Family History with Obesity
            </p>
            <select
              name="o_family_history"
              value={inputValuesO.o_family_history}
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
            <p className="question-p">
              Do you Frequently Consume High-Calorie Meals?
            </p>
            <select
              name="o_favc"
              value={inputValuesO.o_favc}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 7:
        return (
          <div className="question-div">
            <p className="question-p">
              Do you Have Frequent Consumption of Vegetables and Fruits
            </p>
            <select
              name="o_fcvc"
              value={inputValuesO.o_fcvc}
              onChange={handleInputChange}
            >
              <option value={2}>No</option>
              <option value={3}>Yes</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 8:
        return (
          <div className="question-div">
            <p className="question-p">What are Your Number of Main Meals</p>
            <input
              type="number"
              name="o_ncp"
              placeholder="Enter a value"
              value={inputValuesO.o_ncp}
              onChange={handleInputChange}
              min="1"
              max="10"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 9:
        return (
          <div className="question-div">
            <p className="question-p">Do you Smoke</p>
            <select
              name="o_smoke"
              value={inputValuesO.o_smoke}
              onChange={handleInputChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 10:
        return (
          <div className="question-div">
            <p className="question-p">Do you Consume Foods Between Meals</p>
            <select
              name="o_caec"
              value={inputValuesO.o_caec}
              onChange={handleInputChange}
            >
              <option value={0}>{"<300 calories"}</option>
              <option value={1}>{"300-800 calories"}</option>
              <option value={2}>{"800-1300 calories"}</option>
              <option value={3}>{">1300 calories"}</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 11:
        return (
          <div className="question-div">
            <p className="question-p">
              How Much Liquid Water do you Drink Everyday (Liters)
            </p>
            <input
              type="number"
              name="o_ch20"
              step="0.1"
              placeholder="Enter a value"
              value={inputValuesO.o_ch20}
              onChange={handleInputChange}
              min="0"
              max="4"
            />
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 12:
        return (
          <div className="question-div">
            <p className="question-p">How Frequently do you Consume Alcohol</p>
            <select
              name="o_calc"
              value={inputValuesO.o_calc}
              onChange={handleInputChange}
            >
              <option value={0}>{"Never or Rarely"}</option>
              <option value={1}>{"Few Times a Month"}</option>
              <option value={2}>{"Few Times a Week"}</option>
              <option value={3}>{"Everyday"}</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 13:
        return (
          <div className="question-div">
            <p className="question-p">Do you Monitor Your Calories</p>
            <select
              name="o_scc"
              value={inputValuesO.o_scc}
              onChange={handleInputChange}
            >
              <option value={0}>{"No"}</option>
              <option value={1}>{"Yes"}</option>
            </select>
            {/* ... other inputs for Form 2 */}
          </div>
        );
      case 14:
        return (
          <div className="question-div">
            <p className="question-p">
              What is Your Physical Activity per Week
            </p>
            <select
              name="o_faf"
              value={inputValuesO.o_faf}
              onChange={handleInputChange}
            >
              <option value={0}>{"None"}</option>
              <option value={1}>{"1-2 Days a Week"}</option>
              <option value={2}>{"3-4 Days a Week"}</option>
              <option value={3}>{">4 Days a Week"}</option>
            </select>
          </div>
        );
      case 15:
        return (
          <div className="question-div">
            <p className="question-p">
              What is Your Time Using Devices Per Day
            </p>
            <select
              name="o_tue"
              value={inputValuesO.o_tue}
              onChange={handleInputChange}
              step="0.5"
            >
              <option value={0.0}>0-2 Hours</option>
              <option value={0.5}>3 Hours</option>
              <option value={1.0}>4 Hours</option>
              <option value={1.5}>5 Hours</option>
              <option value={2.0}>{">5 Hours"}</option>
            </select>
          </div>
        );
      case 16:
        return (
          <div className="question-div">
            <p className="question-p">What Transportation do you Mainly Use</p>
            <select
              name="o_mtrans"
              value={inputValuesO.o_mtrans}
              onChange={handleInputChange}
            >
              <option value={0}>{"Car"}</option>
              <option value={1}>{"Motorbike"}</option>
              <option value={2}>{"Bike"}</option>
              <option value={3}>{"Public Transport"}</option>
              <option value={4}>{"Walking"}</option>
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
      const response = await fetch("http://127.0.0.1:5000/members");
      const jsonData = await response.json();
      setData(jsonData);

      // Check if the predicted_class exists in the response
      if (jsonData.predicted_class !== undefined) {
        // Map predicted class to label
        const classToLabel = {
          0: "Underweight",
          1: "Normal Weight",
          2: "Obesity 1",
          3: "Obesity 2",
          4: "Obesity 3",
          5: "Overweight 1",
          6: "Overweight 2",
          10: "",
        };

        // Set the corresponding label based on the predicted class
        const newPredictedLabel = classToLabel[jsonData.predicted_class];

        // Set the predictedLabel state
        setPredictedLabel(newPredictedLabel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      o_sex: inputValuesO.o_sex,
      o_age: inputValuesO.o_age,
      o_weight: inputValuesO.o_weight,
      o_height: inputValuesO.o_height,
      o_family_history: inputValuesO.o_family_history,
      o_favc: inputValuesO.o_favc,
      o_fcvc: inputValuesO.o_fcvc,
      o_ncp: inputValuesO.o_ncp,
      o_smoke: inputValuesO.o_smoke,
      o_caec: inputValuesO.o_caec,
      o_ch20: inputValuesO.o_ch20,
      o_calc: inputValuesO.o_calc,
      o_scc: inputValuesO.o_scc,
      o_faf: inputValuesO.o_faf,
      o_tue: inputValuesO.o_tue,
      o_mtrans: inputValuesO.o_mtrans,
    };

    console.log("Data to Send:", dataToSend);

    try {
      const response = await fetch("http://127.0.0.1:5000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message) {
          console.log("Success:", data.message);
          console.log("Predicted Class:", data.predicted_class); // Log predicted_class
          console.log("Predicted probaility", data.prediction_probability);
          setSubmitButtonClicked(true);
          const classToLabel = {
            0: "Underweight",
            1: "Normal Weight",
            2: "Obesity 1",
            3: "Obesity 2",
            4: "Obesity 3",
            5: "Overweight 1",
            6: "Overweight 2",
            10: "",
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
        console.error("Error:", errorData);
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
        name === "o_age" ||
        name === "o_weight" ||
        name === "o_height" ||
        name === "o_ch20" ||
        name === "o_caec" ||
        name === "o_tue"
          ? parseFloat(value)
          : parseInt(value, 10);
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
      <h1 className="page-header">Obesity Level</h1>

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

export default ObesityLevel;
