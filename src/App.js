import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);

      const res = await axios.post('http://localhost:4000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or Server Error');
    }
  };

  const filterResponse = () => {
    if (!response) return {};

    const filteredData = {};
    selectedOptions.forEach(option => {
      filteredData[option.value] = response[option.value];
    });
    return filteredData;
  };

  return (
    <div className="container">
      <h1 className="title">{response?.roll_number || 'Send JSON Object'}</h1>

      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="textarea"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON"
          rows="5"
          cols="50"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {response && (
        <>
          <Select
            className="select-dropdown"
            isMulti
            options={options}
            onChange={setSelectedOptions}
          />
          <div className="response-container">
            <h3 className="response-title">Response</h3>
            <pre className="response-output">{JSON.stringify(filterResponse(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
