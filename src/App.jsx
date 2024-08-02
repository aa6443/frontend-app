import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [jsonError, setJsonError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(inputValue);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error('Invalid input format');
      }
      setJsonError(null);

      const apiResponse = await axios.post('https://<your-netlify-site>.netlify.app/.netlify/functions/api/bfhl', parsedInput);
      setResponse(apiResponse.data);
    } catch (error) {
      setJsonError('Invalid JSON format or structure');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = response.highest_alphabet;

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>JSON Input Processor</h1>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        rows="10"
        cols="50"
        placeholder='Enter JSON: {"data": ["A","C","z"]}'
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {jsonError && <p style={{ color: 'red' }}>{jsonError}</p>}

      {response && (
        <div>
          <label htmlFor="responseOptions">Select Response Options:</label>
          <select id="responseOptions" multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
        </div>
      )}

      <div>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
