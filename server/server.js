const app = require('express')();

app.get('/', (req, res) => {
  res.send('works');
});

app.listen(process.env.PORT || 3001, () => {
  console.log('running on port process or 3001');
});
