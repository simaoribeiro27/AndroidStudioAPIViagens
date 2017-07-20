var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var fs = require("fs");
var jsonfile = require('jsonfile')
var dbClassif = './data/classificacoes.json'

// GET  url..classificacoes .
router.get("/", function (req, res, next) {
  fs.readFile(dbClassif, 'utf8', function (err, data) {
    if (!err) { res.send(data); }
    else { res.status(400).jsonp(err); }
  });
});

// GET url=.../classificacoes/:id 
router.get('/:id', function (req, res) {
  fs.readFile(dbClassif, 'utf8', function (err, data) {
    if (!err) {
      classificacoes = JSON.parse(data);
      var classificacao = classificacoes[req.params.id - 1]
      console.log(classificacao);
      res.send(JSON.stringify(classificacao));
    }
    else { res.status(400).jsonp(err); }
  });
})

// DEL    url=../classificacoes/:id
router.delete('/:id', function (req, res) {
  fs.readFile(dbClassif, 'utf8', function (err, data) {
    if (!err) {
      var classificacao = JSON.parse(data);
      delete classificacao[req.params.id - 1];
      console.log(classificacao);
      res.send(JSON.stringify(classificacao));
      jsonfile.writeFileSync(dbClassif, classificacao);
    }
    else { res.status(400).jsonp(err); }
  });
})


// POST (create) url=...0/classificacoes
router.post('/', function (req, res) {
  var A = req.body.A;
  var B = req.body.B;
  var C = req.body.C;
  var idMomento = req.body.idMomento
  console.dir(req.body);
  fs.readFile(dbClassif, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      var tam = Object.keys(data).length;
      var data2 = { "A": A, "B": B, "C": C, "idMomento": idMomento, "id": tam + 1 };
      data[tam] = data2;
      jsonfile.writeFileSync(dbClassif, data)
      res.send(JSON.stringify(data));
      return;
    }
    else { res.status(400).jsonp(err); }
  });
})
module.exports = router;
