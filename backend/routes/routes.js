const express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');
var pool = mysql.createPool(dbconfig.connection);

module.exports = function(app) {

    var a = 4;
    app.get("/", function(req, res) {
        res.send("<big>Hello Tooners!</big>");
    })
    
    app.post("/login.tnr", function(req, res) {
        res.status(200).json(
            {
                "message":"test",
                "a" : a
            }
        )
    });
}