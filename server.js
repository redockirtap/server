const express = require("express"); // framework for nodejs
const cors = require("cors"); // to connect with front end that is in another location
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));


const CLIENT_ID = "2e7940c77b22ef261b29";
const CLIENT_SECRET = "efb0f6c5178cdae4336c78047ca8a2bf3f7e8ff6";

const app = express();
app.use(cors());
app.use(express.json()); // body-parser is deprecated; can use express.json()

// code from front end
app.get("/getAccessToken", async function (req, res) {

    const clientRequest = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

    await fetch(`https://github.com/login/oauth/access_token${clientRequest}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return res.json(data); // response to front end
    });

});

app.get("/getUserProfile", async function (req, res) {
    req.get("Authorization");
    
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization"),
        }
    }).then(response => response.json()).then(data => {
        console.log(data);
        return res.json(data);
    });
})

app.get("/getUserRepos", async function (req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization"),
        }
    }).then(response => response.json()).then(data => {res.set("Cache-Control", "public"); res.json(data)});
})

app.listen(4000, function () {
    console.log('it works!')
})