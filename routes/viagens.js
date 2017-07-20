var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var jsonfile = require('jsonfile')
var dbViagens = './data/viagens.json'

// GET url= ../viagens  
router.get("/", function (req, res, next) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    if (!err) { res.send(data); }
    else { res.status(400).jsonp(err); }
  });
});

// GET  url=.. /viagens/:id  
router.get('/:id', function (req, res) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    if (!err) {
      viagens = JSON.parse(data);
      var viagen = viagens[req.params.id - 1];
      //console.log(viagen);
      res.send(JSON.stringify(viagen));
    }
    else { res.status(400).jsonp(err); }
  });
})

// DEL url=.. /viagens/:id
router.delete('/:id', function (req, res) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      delete data[req.params.id - 1];
      console.log(data);
      res.send(JSON.stringify(data));
      jsonfile.writeFileSync(dbViagens, data);
    }
    else { res.status(400).jsonp(err); }
  });
})

// POST (create) url=.. /viagens
router.post('/', function (req, res) {
  var Pais = req.body.Pais;
  var Cidade = req.body.Cidade;
  var Longitude = req.body.Longitude;
  var Latitude = req.body.Latitude;
  var Data = req.body.Data;
  var Descricao = req.body.Descricao;
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      var tam = Object.keys(data).length;
      var data2 = { "Pais": Pais, "Cidade": Cidade, "Longitude": Longitude, "Latitude": Latitude, "Data": Data, "Descricao": Descricao, "id": tam + 1 };
      data[tam] = data2;
      jsonfile.writeFileSync(dbViagens, data)
      res.send(JSON.stringify(data));
      return;
    }
    else { res.status(400).jsonp(err); }
  });
})

// PUT (update) url=.. /viagens/:id
router.put('/:id', function (req, res) {
  var Descricao = req.body.Descricao;
  var id = req.params.id;
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      data[req.params.id - 1].Descricao = req.body.Descricao;
      jsonfile.writeFileSync(dbViagens, data)
      res.send(JSON.stringify(data));
      return;
    }
    else { res.status(400).jsonp(err); }
  });
})

module.exports = router;
