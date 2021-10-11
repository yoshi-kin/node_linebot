const https = require("https")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000
const TOKEN = process.env.MSG_SPI_TUTORIAL_ACCESS_TOKEN

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

app.post("/webhook", function(req, res) {
    res.send("HTTP POST request sent to the webhook URL!")
    if (req.body.events[0].message.text === "Hello") {

        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "text",
                    "text": "hello!!"
                },
                {
                    "type": "text",
                    "text": "Are you fine?"
                }
            ]
        })
    
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }
    
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }
    
        // Define request
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })
    
        // Handle error
        request.on("error", (err) => {
            console.error(err)
        })
    
        // Send data
        request.write(dataString)
        request.end()
    }else if (req.body.events[0].message.text === "Good") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "text",
                    "text": "Have a nice day"
                }
            ]
        })
    
        // Request header
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }
    
        // Options to pass into the request
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }
    
        // Define request
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })
    
        // Handle error
        request.on("error", (err) => {
            console.error(err)
        })
    
        // Send data
        request.write(dataString)
        request.end()
    }
})