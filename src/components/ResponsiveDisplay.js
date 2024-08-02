/* eslint-disable react/prop-types */


const ResponseDisplay = ({ response, selectedOptions }) => {
  const filteredResponse = {};
  if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
  if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
  if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = response.highest_alphabet;

  return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
};

export default ResponseDisplay;
