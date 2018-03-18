const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

let polls = [];
let id = 0;

app.get('/api/polls', (req, res) => {
	res.send(polls);
});

app.post('/api/polls', (req, res) => {
  id = id + 1;
  //priority = 42;
  let prompt = {id:id, text:req.body.text, totalResponses: req.body.totalResponses, yesResponses:req.body.yesResponses, percentAgree:0};
  polls.push(prompt);
  res.send(prompt);
});

app.put('/api/polls/:id', (req, res) => {
	//alert("Stage 2");
  let id = parseInt(req.params.id);
  let pollsMap = polls.map(prompt => { return prompt.id; });
  let index = pollsMap.indexOf(id);
  let prompt = polls[index];
  prompt.text = req.body.text;
  prompt.totalResponses = req.body.totalResponses;
  prompt.yesResponses = req.body.yesResponses;
  prompt.percentAgree = req.body.percentAgree;

  res.send(prompt);

});

app.listen(8000, () => console.log('Server listening on port 8000!'));

