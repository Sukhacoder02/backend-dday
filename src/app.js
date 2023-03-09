const express = require('express');
const cors = require('cors');
const PORT = 2222;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello World! backend');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${port}`);
});
