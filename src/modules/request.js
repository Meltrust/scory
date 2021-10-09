const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const finalUrl = `${apiUrl}/GhgnNFpn1j825jSUMgd2/scores/`;

// Retreive from API
const fetchScores = fetch(finalUrl, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then((result) => result.json())
  .then((data) => {
    const userScores = data.result;
    return userScores;
  });

// POST score to API
const postScores = (scoreValue) => {
  const request = fetch(finalUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: scoreValue.user, score: scoreValue.score }),
  });
  return request;
};

export { fetchScores, postScores };
