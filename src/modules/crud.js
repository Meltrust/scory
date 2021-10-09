import { fetchScores, postScores } from './request';

// Create scores array from api data
const scoresArr = async () => {
  let scores = [];
  try {
    scores = await fetchScores;
  } catch (err) {
    throw new Error(`Error getting scores data: ${err}`);
  }
  return scores;
};

// Make table template from scores array
const tableTemplate = (arr) => {
  const table = document.querySelector('#table');
  table.innerHTML = '';
  arr.forEach((element) => {
    if (element.score <= 100 && element.score > 0 && /[a-zA-Z]/.test(element.user)) {
      const row = document.createElement('tr');
      row.innerHTML = `
      <th class="d-flex align-items-center text-capitalize" scope="row">
        ${element.user}
      </th>
      <td >${element.score}</td>`;
      table.appendChild(row);
    }
  });
};

// Get the scores array and display the table
const fillTable = async () => {
  const results = await scoresArr();
  const scoresList = await results;
  tableTemplate(scoresList);
};

// Clear the inputs
const clearInputs = (name, score) => {
  name.value = '';
  score.value = '';
};

// Send score to the server and refresh
const sendScore = async (score) => {
  try {
    await postScores(score);
    document.location.reload();
  } catch (error) {
    throw new Error(`Error getting the scores: ${error}`);
  }
};

// Get form user input and update data
const addScores = () => {
  const name = document.querySelector('#name');
  const score = document.querySelector('#score');
  const entry = { user: name.value, score: score.value };
  const form = document.getElementById('main-form');
  const inputError = document.createElement('small');
  inputError.classList.add('mt-3');

  if (score.value <= 0 || score.value > 100 || score.value == null) {
    inputError.innerHTML = 'Please submit a score between 1 and 100';
    form.appendChild(inputError);
  } else if (name.value.length < 3 || name.value === '') {
    inputError.innerHTML = 'Names must be from 3 to 10 characters long';
    form.appendChild(inputError);
  } else {
    sendScore(entry);
    clearInputs(name, score);
    fillTable();
  }
  setTimeout(() => {
    inputError.remove();
  }, 3000);
};

export {
  fillTable, addScores,
};
