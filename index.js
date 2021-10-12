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
    }else if (req.body.events[0].message.text === "Carousel") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "template",
                    "altText": "this is a carousel template",
                    "template": {
                        "type": "carousel",
                        "columns": [
                            {
                              "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                              "imageBackgroundColor": "#FFFFFF",
                              "title": "this is menu",
                              "text": "description",
                              "defaultAction": {
                                  "type": "uri",
                                  "label": "View detail",
                                  "uri": "http://example.com/page/123"
                              },
                              "actions": [
                                  {
                                      "type": "postback",
                                      "label": "Buy",
                                      "data": "action=buy&itemid=111"
                                  },
                                  {
                                      "type": "postback",
                                      "label": "Add to cart",
                                      "data": "action=add&itemid=111"
                                  },
                                  {
                                      "type": "uri",
                                      "label": "View detail",
                                      "uri": "http://example.com/page/111"
                                  }
                              ]
                            },
                            {
                              "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                              "imageBackgroundColor": "#000000",
                              "title": "this is menu",
                              "text": "description",
                              "defaultAction": {
                                  "type": "uri",
                                  "label": "View detail",
                                  "uri": "http://example.com/page/222"
                              },
                              "actions": [
                                  {
                                      "type": "postback",
                                      "label": "Buy",
                                      "data": "action=buy&itemid=222"
                                  },
                                  {
                                      "type": "postback",
                                      "label": "Add to cart",
                                      "data": "action=add&itemid=222"
                                  },
                                  {
                                      "type": "uri",
                                      "label": "View detail",
                                      "uri": "http://example.com/page/222"
                                  }
                              ]
                            }
                        ],
                        "imageAspectRatio": "rectangle",
                        "imageSize": "cover"
                    }
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
    }else if (req.body.events[0].message.text === "Image"){
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "location",
                    "title": "my location",
                    "address": "〒160-0004 東京都新宿区四谷一丁目6番1号", 
                    "latitude": 35.687574,
                    "longitude": 139.72922
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