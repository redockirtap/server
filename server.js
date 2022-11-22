const express = require("express"); // framework for nodejs
const cors = require("cors"); // to connect with front end that is in another location
const axios = require("axios");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const PORT = 4000;
const CLIENT_ID = "2e7940c77b22ef261b29";

console.log(process.env.CLIENT_SECRET)
const app = express();
app.use(cors());
app.use(express.json()); // body-parser is deprecated; can use express.json()

// code from front end
app.get("/getAccessToken", async function (req, res) {

    const clientRequest = `?client_id=${CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;

    await axios.request(`https://github.com/login/oauth/access_token${clientRequest}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    }).then((response) => {
        return res.json(response.data); // response to front end
    });

});

app.get("/getUserProfile", async function (req, res) {
    req.get("Authorization");
    
    await axios.request("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization"),
        }
    }).then(response => res.json(response.data))
})

app.get("/getUserRepos", async function (req, res) {
    req.get("Authorization");
    await axios.request("https://api.github.com/user/repos", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization"),
        }
    }).then(response => res.json(response.data));
})

app.listen(PORT, function () {
    console.log('it works!')
})