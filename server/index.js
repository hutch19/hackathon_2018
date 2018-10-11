const WebSocketServer = require('ws').Server
const express = require('express')

const wss = new WebSocketServer({port: 40510})

const sockets = [];

wss.on('connection', function (ws) {
    sockets.push(ws);
});


const data = [
    {
        id: 1,
        date_time: 1539253304,
        payload: {
            intent: "topFundsBySector",
            title: "Top Funds in Energy Sector",
            tags: ["energy"],
            type: "suggestion",
            response: [
                {
                    "title": "Vanguard energy fund",
                    "url": "https://msim.com"
                },
                {
                    "title": "Fidelity energy fund",
                    "url": "https://msim.com"
                },
                {
                    "title": "HSBC energy fund",
                    "url": "https://msim.com"
                }
            ]
        }
    },
    {
        id: 2,
        date_time: 1539257435,
        payload: {
            intent: "topFundsBySector",
            title: "Top Funds from Fidelity in Energy Sector",
            tags: ["energy", "fidelity"],
            type: "suggestion",
            response: [
                {
                    "title": "Frontier Energy Markets Portfolio - 47.8% financials allocation",
                    "url": "https://msim.com"
                },
                {
                    "title": "Fidelity energy fund",
                    "url": "https://msim.com"
                }
            ]
        }
    }
]

let counter = 0;
setInterval(
    () => {
        sockets.forEach((sock) => {
            if (sock.readyState === sock.OPEN) {
                const response = data[counter];
                sock.send(JSON.stringify(response));
                counter++;
                if(counter >= data.length) counter = 0;
             } 
        })
    },
    2000
  )


const app = express()
const port = 3001
app.get('/example', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
