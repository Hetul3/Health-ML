import React from "react";
import { useState } from "react";

function BreastCancerRecurrence() {
  const [inputValuesB, setInputValues] = useState({
    b_age: 0,
    b_menopause: 0,
    b_tumor_size: 0,
    b_inv_nodes: 0,
    b_node_cap: 0,
    b_dep_malig: 0,
    b_breast: 0,
    b_breast_quad: 0,
    b_irradiat: 0,
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    //check if it's the integer input to minipulate it
    if (name === "b_age") {
      //10 for radix, needed
      const val = parseInt(value, 10);

      if (!isNaN(val) && val >= 0 && val <= 100) {
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: val / 10,
        }));
      }
    } else if (name === "b_tumor_size") {
      const val = parseInt(value, 10);
      if (!isNaN(val) && val >= 0 && val <= 59) {
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: val / 5,
        }));
      }
    } else if (name === "b_inv_nodes") {
      const val = parseInt(value, 10);
      if (!isNaN(val) && val >= 0 && val <= 39) {
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: val / 3,
        }));
      }
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const sendInputs = () => {
    // Create a JSON representation of the inputValuesB object
    const jsonData = JSON.stringify(inputValuesB);
  
    // Make a POST request to your Django server
    fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <h1>Breast Cancer Recurrence Page</h1>
      <p>This is the Breast Cancer Recurrence page content.</p>

      <p>What is your age</p>
      <input
        type="number"
        name="b_age"
        placeholder="Enter a value"
        value={inputValuesB.b_age}
        onChange={handleInputChange}
        min="0"
        max="100"
      />

      <p>What is your Menopause status</p>
      <select
        name="b_menopause"
        value={inputValuesB.b_menopause}
        onChange={handleInputChange}
      >
        <option value={0}>Less than 40</option>
        <option value={1}>Greater than or equal to 40</option>
        <option value={2}>Premenopause</option>
      </select>

      <p>What is the tumour size</p>
      <input
        type="number"
        name="b_tumor_size"
        placeholder="Enter a value"
        value={inputValuesB.b_tumor_size}
        onChange={handleInputChange}
        min="0"
        max="59"
      />

      <p>What are the Involved Lymph Nodes</p>
      <input
        type="number"
        name="b_inv_nodes"
        palceholder="Enter a value"
        value={inputValuesB.b_inv_nodes}
        onChange={handleInputChange}
        min="0"
        max="39"
      />

      <p>Has it Penetrated the Capsule of at Least One Lymph Node</p>
      <select
        name="b_node_cap"
        value={inputValuesB.b_node_cap}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <p>Degree of Maligency</p>
      <select
        name="b_deg_malig"
        value={inputValuesB.b_dep_malig}
        onChange={handleInputChange}
      >
        <option value={0}>Grade 1</option>
        <option value={1}>Grade 2</option>
        <option value={2}>Grade 3</option>
      </select>

      <p>Which Breast Has Been Impacted</p>
      <select
        name="b_breast"
        value={inputValuesB.b_breast}
        onChange={handleInputChange}
      >
        <option value={0}>Left</option>
        <option value={1}>Right</option>
      </select>
      <p>Which Quad Has Been Impacted</p>
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

      <p>Was Radiation Therapy Used?</p>
      <select
        name="b_irradiat"
        value={inputValuesB.b_irradiat}
        onChange={handleInputChange}
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <button onClick={sendInputs}>Send Data</button>
    </div>
  );
}

export default BreastCancerRecurrence;
