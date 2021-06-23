const app = require('./app.js');
const db = require('./mongo.js');
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});