const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 2222;
const contentTypeRouter = require('./routes/contentType.routes');
const collectionEntriesRouter = require('./routes/collectionEntries.routes');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/content-type', contentTypeRouter);
app.use('/api/collection-entries', collectionEntriesRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
