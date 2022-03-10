const express = require("express");
const req = require("express/lib/request");

const app = express();

app.get("", (req, res) => {
    res.send("Hello");
});

app.get("/book", (req, res) => {
    res.send(
        [{
            "Name": "2 States",
            "Author": "Chetan Bhagat",
            "Movie": "2 States",
        },
        {
            "Name": "3 point Someone",
            "Author": "Chetan Bhagat",
            "Movie": "3 Idiots"
        },
        {
            "Name": "3 point Someone",
            "Author": "Chetan Bhagat",
            "Movie": "3 Idiots"
        },
        {
            "Name": "3 point Someone",
            "Author": "Chetan Bhagat",
            "Movie": "3 Idiots"
        }]);
});

app.listen(4000, () => {
    console.log("Port 4000 is created");
});