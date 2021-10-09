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

  sendScore(entry);
  clearInputs(name, score);
  fillTable();
};

export {
  fillTable, addScores,
};
