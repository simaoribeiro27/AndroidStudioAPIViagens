
var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var fs = require("fs");
var fs1 = require("fs");
var fs2 = require("fs");
var jsonfile = require('jsonfile')

var dbMomentos = './data/momentos.json'
var dbViagens = './data/viagens.json'
var dbClassif = './data/classificacoes.json'

//uma  viagem e todos os seus momentos
//GET     url= .../viagens/:id/momentos  
router.get('/viagens/:id/momentos', function (req, res) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    var data = JSON.parse(data);
    var objetos = [];
    var viagem = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i]['id'] == req.params.id) {
        viagem = data[i];
        var id = viagem['id']
      }
    }
    fs1.readFile(dbMomentos, 'utf8', function (err, data) {
      var momentos = JSON.parse(data);
      for (var i = 0; i < momentos.length; i++) {
        var objecto = momentos[i];
        if ((objecto['idViagem'] == id)) {
          objetos.push(objecto);
        }
      }
      return res.send(JSON.stringify({ viagem: viagem, momentos: objetos }));
    });
    //
  });
})

//Uma dada viagem com todos os repetivos momentos  e todas as pontuaçoes desses momentos 
// GET  /viagens/:id/momentos/classificacoes 
router.get('/viagens/:id/momentos/classificacoes', function (req, res) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    var data = JSON.parse(data);
    var objetos = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['id'] == req.params.id) {
        viagem = data[i];
        var idViagem = viagem['id']
      }
    }
    console.log(viagem)
    fs1.readFile(dbMomentos, 'utf8', function (err, data) {
      var momentos = JSON.parse(data);
      for (var i = 0; i < momentos.length; i++) {
        var objecto = momentos[i];
        if ((objecto['idViagem'] == idViagem)) {
          objetos.push(objecto);
        }
      }
      fs2.readFile(dbClassif, 'utf8', function (err, data) {
        var classifi = JSON.parse(data);
        var classificacoes = [];
        for (var i = 0; i < objetos.length; i++) {
          for (var j = 0; j < classifi.length; j++) {
            if (classifi[j]['idMomento'] == objetos[i]['id']) {
              classificacoes.push(classifi[j]);
            }
          }
        }
        var A = 0;
        var B = 0;
        var C = 0;
        for (var j = 0; j < classificacoes.length; j++) {
          if (classificacoes[j]['A'] == true) {
            A = A + 1;
          }
          if (classificacoes[j]['B'] == true) {
            B = B + 1;
          }
          if (classificacoes[j]['C'] == true) {
            C = C + 1;
          }
        }
        notas = 'True A = Já fui muito feliz aqui = ' + A + '  True B = Nunca tinha experimentado, estou maravilhado! = ' + B + '  True C = Esta vai direto para minha bucket list! = ' + C
        return res.send(JSON.stringify({ viagem: viagem, momentos: objetos, classificacao: notas }));
      });
    });
  });
})


//Uma dada viagem com  todas as pontuaçoes dos seus momentos 
// GET  /viagens/:id/classificacoes 
router.get('/viagens/:id/classificacoes', function (req, res) {
  fs.readFile(dbViagens, 'utf8', function (err, data) {
    var data = JSON.parse(data);
    var objetos = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['id'] == req.params.id) {
        viagem = data[i];
        var idViagem = viagem['id']
      }
    }
    fs1.readFile(dbMomentos, 'utf8', function (err, data) {
      var momentos = JSON.parse(data);
      for (var i = 0; i < momentos.length; i++) {
        var objecto = momentos[i];
        if ((objecto['idViagem'] == idViagem)) {
          objetos.push(objecto);
        }
      }
      fs2.readFile(dbClassif, 'utf8', function (err, data) {
        var classifi = JSON.parse(data);
        var classificacoes = [];
        for (var i = 0; i < objetos.length; i++) {
          for (var j = 0; j < classifi.length; j++) {
            if (classifi[j]['idMomento'] == objetos[i]['id']) {
              classificacoes.push(classifi[j]);
            }
          }
        }
        var A = 0;
        var B = 0;
        var C = 0;
        for (var j = 0; j < classificacoes.length; j++) {
          if (classificacoes[j]['A'] == true) {
            A = A + 1;
          }
          if (classificacoes[j]['B'] == true) {
            B = B + 1;
          }
          if (classificacoes[j]['C'] == true) {
            C = C + 1;
          }
        }
        notas = 'True A = Já fui muito feliz aqui = ' + A + '  True B = Nunca tinha experimentado, estou maravilhado! = ' + B + '  True C = Esta vai direto para minha bucket list! = ' + C
        return res.send(JSON.stringify({ viagem: viagem, classificacao: notas }));
      });
    });
  });
})



module.exports = router;

