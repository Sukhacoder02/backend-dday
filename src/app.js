const express = require('express');
const cors = require('cors');
const PORT = 2222;
const contentTypeRouter = require('./routes/contentType.routes');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/content-type', contentTypeRouter);

app.get('/', (req, res) => {
  res.send('Hello World! backend');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
