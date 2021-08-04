var connector = require('./connector');
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getPlayerByName/", (request, response) => {
    const connection = connector.getConnection();
    connection.connect((cError) => {
        // If there is a connection error to the database, return an error
        if (cError) return response.status(500).send({ "error": cError });

        // If not, let's get the user by the  name in the request parameters
        connection.query("select * from highscore where name=?", [request.query.name], (qError, results) => {
            // End the connection so we don't keep hogging the database
            connection.end();
            // If there is a query error, return the error, if not return the query results
            if (qError) return response.status(500).send({ "error": qError });
            return response.status(200).send({ "data": results });
        });
    });
});

app.get("/getTopPlayers/", (request, response) => {
    const connection = connector.getConnection();
    connection.connect((cError) => {
        // If there is a connection error to the database, return an error
        if (cError) return response.status(500).send({ "error": cError });

        // If not, let's get the user by the  name in the request parameters
        connection.query("select * from highscore order by score desc limit 10", (qError, results) => {
            // End the connection so we don't keep hogging the database
            connection.end();
            // If there is a query error, return the error, if not return the query results
            if (qError) return response.status(500).send({ "error": qError });
            return response.status(200).send({ "data": results });
        });
    });
});

app.post("/addPlayer/", (request, response) => {
    const connection = connector.getConnection();
    connection.connect((cError) => {
        // If there is a connection error to the database, return an error
        if (cError) return response.status(500).send({ "error": cError });

        // If not, let's get the user by the  name in the request parameters
        connection.query("insert into highscore (name, score) values (?, ?)", [request.body.name, request.body.score], (qError, results) => {
            // End the connection so we don't keep hogging the database
            connection.end();
            // If there is a query error, return the error, if not return the query results
            if (qError) return response.status(500).send({ "error": qError });
            return response.status(200).send({ "data": results });
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server has started');
});

