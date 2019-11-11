const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.send("<big>Hello Tooners!</big>");
})



var server = app.listen(80, function() {
    console.log("Tooner Since 2019! 서버가 켜지고 있습니다.");
})