var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var fs = require("fs");
var fs1 = require("fs");
var jsonfile = require('jsonfile');
var dbMomentos = './data/momentos.json';
var path = require('path');

//multer object creation
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


// GET       url= .../momentos 
router.get("/", function (req, res, next) {
  fs.readFile(dbMomentos, 'utf8', function (err, data) {
    if (!err) { res.send(data); }
    else { res.status(400).jsonp(err); }
  });
});


// GET  url= ..momentos/:id 
router.get('/:id', function (req, res) {
  fs.readFile(dbMomentos, 'utf8', function (err, data) {
    momentos = JSON.parse(data);
    var momento = momentos[req.params.id - 1];
    console.log(momento);
    res.send(JSON.stringify(momento));
  });
})

// DEL   url=../momentos/:id
router.delete('/:id', function (req, res) {
  var i = req.params.id;
  fs.readFile(dbMomentos, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      delete data[req.params.id - 1];
      console.log(data);
      res.send(JSON.stringify(data));
      jsonfile.writeFileSync(dbMomentos, data);
    }
    else { res.status(400).jsonp(err); }
  });
})

// POST (create)    url= .../momentos
router.post('/', upload.single('Media'), function (req, res) {
  var Localidade = req.body.Localidade;
  var Tempo = req.body.Tempo;
  var Longitude = req.body.Longitude;
  var Latitude = req.body.Latitude;
  var Descricao_Momento = req.body.Descricao_Momento;
  var ImagemUrl = req.file.path;
  //var ImagemUrl = req.file.path;
  //Var Media=carrega imagem
  var Data = req.body.Data;
  var idViagem = req.body.idViagem;
  fs.readFile(dbMomentos, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      var tam = Object.keys(data).length;
      var data2 = {
        "Localidade": Localidade, "Tempo": Tempo, "Longitude": Longitude, "Latitude": Latitude, "Descricao_Momento": Descricao_Momento,
        "ImagemUrl": ImagemUrl, "Data": Data, "idViagem": idViagem, "id": tam + 1
      };
      data[tam] = data2;
      jsonfile.writeFileSync(dbMomentos, data)
      res.send(JSON.stringify(data));
      return;
    }
    else { res.status(400).jsonp(err); }
  });
})

// PUT (update)   url=.../momentos/:id
router.put('/:id', function (req, res) {
  var Descricao_Momento = req.body.Descricao_Momento;
  var Imagem = req.body.Imagem;
  var id = req.params.id;
  fs.readFile(dbMomentos, 'utf8', function (err, data) {
    if (!err) {
      data = JSON.parse(data);
      data[req.params.id - 1].Descricao_Momento = req.body.Descricao_Momento;
      data[req.params.id - 1].Imagem = req.body.Imagem;
      jsonfile.writeFileSync(dbMomentos, data)
      res.send(JSON.stringify(data));
      return;
    }
    else { res.status(400).jsonp(err); }
  });
})

module.exports = router;

    // POST (create) url= localhost:3000/momentos
    //sem carregamento de imagens
  /*router.post('/', function (req, res) {
    var Localidade = req.body.Localidade;
    var Tempo = req.body.Tempo;
    var Longitude = req.body.Longitude;
    var Latitude = req.body.Latitude;
    var Descricao_Momento = req.body.Descricao_Momento;
    var Imagem = req.body.Imagem;
    var Data = req.body.Data;
    var idViagem = req.body.idViagem;
    //console.dir(req.body);
    fs.readFile(dbMomentos, 'utf8', function (err, data) {
      if (!err) {
        data = JSON.parse(data);
        var tam = Object.keys(data).length;
        var data2 = {"Localidade": Localidade, "Tempo": Tempo, "Longitude": Longitude, "Latitude": Latitude, "Descricao_Momento": Descricao_Momento,
          "Imagem": Imagem, "Data": Data, "idViagem":idViagem, "id": tam + 1 };
        data[tam] = data2;
        jsonfile.writeFileSync(dbMomentos, data)
        res.send(JSON.stringify(data));
        return;
      }
      else { res.status(400).jsonp(err); }
    });
  })*/
//https://www.npmjs.com/package/multer