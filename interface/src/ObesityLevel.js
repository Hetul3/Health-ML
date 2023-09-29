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
      <select
        name="o_family_history"
        value={inputValuesO.o_family_history}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>Do you Frequently Consume High-Calorie Meals?</p>
      <select
        name="o_favc"
        value={inputValuesO.o_favc}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>Do you Have Frequent Consumption of Vegetables and Fruits</p>
      <select
        name="o_fcvc"
        value={inputValuesO.o_fcvc}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>What are Your Number of Main Meals</p>
      <input
        type="number"
        name="o_ncp"
        placeholder="Enter a value"
        value={inputValuesO.o_ncp}
        onChange={handleInputChange}
        min="1"
        max="10"
      />

      <p>Do you Smoke</p>
      <select
        name="o_smoke"
        value={inputValuesO.o_smoke}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>Do you Consume Foods Between Meals</p>
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

      <p>How Much Liquid Water do you Drink Everyday</p>
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

      <p>How Frequently do you Consume Alcohol</p>
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

      <p>Do you Monitor Your Calories</p>
      <select
        name="o_scc"
        value={inputValuesO.o_scc}
        onChange={handleInputChange}
      >
        <option value={0}>{"No"}</option>
        <option value={1}>{"Yes"}</option>
      </select>

      <p>What is Your Physical Activity per Week</p>
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

      <p>What is Your Time Using Devices Per Day</p>
      <select
        name="o_tue"
        value={inputValuesO.o_tue}
        onChange={handleInputChange}
      >
        <option value={0.0}>{"0-2 Hours"}</option>
        <option value={0.5}>{"3 Hours"}</option>
        <option value={1.0}>{"4 Hours"}</option>
        <option value={1.5}>{"5 Hours"}</option>
        <option value={2.0}>{">5 Hours"}</option>
      </select>

      <p>What Transportation do you Mainly Use</p>
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

    </div>
  );
}

export default ObesityLevel;
