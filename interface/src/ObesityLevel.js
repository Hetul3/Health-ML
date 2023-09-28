import React from "react";
import { useState } from "react";

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

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  return (
    <div>
      {/* could code in a quick converter for people */}
      <h1>Obesity Level Page</h1>
      <p>This is the Obesity Level page content.</p>

      <p>What Is Your Sex</p>
      <select
        name="o_sex"
        value={inputValuesO.o_sex}
        onChange={handleInputChange}
      >
        <option value={1}>Female</option>
        <option value={0}>Male</option>
      </select>

      <p>Input Your Age</p>
      <input
        type="number"
        name="o_age"
        placeholder="Enter a value"
        value={inputValuesO.o_age}
        onChange={handleInputChange}
        min="18"
        max="100"
      />

      <p>Input Your Weight in kg</p>
      <input
        type="number"
        name="o_weight"
        placeholder="Enter a value"
        value={inputValuesO.o_weight}
        onChange={handleInputChange}
        min="30"
        max="250"
      />

      <p>What is Your Height in meters</p>
      <input
        type="number"
        step="0.01"
        name="o_height"
        placeholder="Enter a value"
        value={inputValuesO.o_height}
        onChange={handleInputChange}
        min="0"
        max="2.5"
      />

      <p>Do you Have a Family History with Obesity</p>
      <p>Do you Frequently Consume High-Calorie Meals?</p>
      <p>Do you Have Frequent Consumption of Vegetables and Fruits</p>
      <p>What are Your Number of Main Meals</p>
      <p>Do you Smoke</p>
      <p>Do you Consume Foods Between Meals</p>
      <p>How Frequently do you Consume Alcohol</p>
      <p>Do you Monitor Your Calories</p>
      <p>What is Your Physical Activity per Week</p>
      <p>What is Your Time Using Devices</p>
      <p>What Transportation do you Mainly Use</p>
    </div>
  );
}

export default ObesityLevel;
