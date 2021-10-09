import './style.css';
import {
  fillTable, addScores,
} from './modules/crud';

document.addEventListener('load', fillTable());

const refreshBtn = document.querySelector('#refreshBtn');
refreshBtn.addEventListener('click', () => {
  document.location.reload();
});

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', () => {
  addScores();
});
