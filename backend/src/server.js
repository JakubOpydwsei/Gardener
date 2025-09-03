const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Express działa!');
});

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`);
});