import express from 'express';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Service started on port : ${port}`);
});
