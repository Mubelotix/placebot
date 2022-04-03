if (typeof browser === "undefined") {
    var browser = chrome;
}

var token = undefined;
var running = false;

let beginx = 960
let beginy = 496
let width = 40
let height = 10
let color = 8
let rows = 0
let chars = 0

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// All this code was copied from 2b2t's bot
async function run() {
    running = true;
    alert("The bot is running");

    main_loop: for (let i = 0; i < 10000; i++) {
        let image = `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
        let bearer = token;
        let accounts = bearer.split('\n')
    
        for (const account of accounts) {
            const lines = image.split('\n')
            rows = getRandomInt(0, height - 1)
            chars = getRandomInt(0, width - 1)
            x = beginx + chars
            y = beginy + rows
    
            console.log(`${account} ${x} ${y} ${lines} ${chars} ${rows}`)
            if (lines[rows][chars] == "r") { // red
                color = 2
            } else if (lines[rows][chars] == "g") { // light green
                color = 8
            } else if (lines[rows][chars] == "b") { // dark blue
                color = 12
            } else if (lines[rows][chars] == "o") { // orange
                color = 3
            } else if (lines[rows][chars] == "x") { // gray
                color = 29
            } else if (lines[rows][chars] == "w") { // white
                color = 31
            } else if (lines[rows][chars] == "y") { // yellow
                color = 4
            } else if (lines[rows][chars] == "1") { // dark green
                color = 6
            } else if (lines[rows][chars] == "2") { // light blue
                color = 14
            } else if (lines[rows][chars] == "3") { // dark purple
                color = 18
            } else if (lines[rows][chars] == "p") { // purple
                color = 19
            } else if (lines[rows][chars] == "4") { // light pink
                color = 23
            } else if (lines[rows][chars] == "5") { // brown
                color = 25 
            } else if (lines[rows][chars] == "6") { // light gray
                color = 30
            } else if (lines[rows][chars] == "q") { // black
                color = 27
            } else { // if it doesnt recognize the character it just puts black
                continue main_loop
            }

            console.log(`(${x},${y},${color})`)

            canvas_index = 0
            if (x >= 1000) {
                x -= 1000
                canvas_index = 1
            }
    
            const postResponse = await fetch("https://gql-realtime-2.reddit.com/query", {
            "headers": {
                "accept": "*/*",
                "authorization": account.trim(),
                "content-type": "application/json",
            },

            "body": `{\"operationName\":\"setPixel\",\"variables\":{\"input\":{\"actionName\":\"r/replace:set_pixel\",\"PixelMessageData\":{\"coordinate\":{\"x\":${x},\"y\":${y}},\"colorIndex\":${color},\"canvasIndex\":${canvas_index}}}},\"query\":\"mutation setPixel($input: ActInput!) {\\n  act(input: $input) {\\n    data {\\n      ... on BasicMessage {\\n        id\\n        data {\\n          ... on GetUserCooldownResponseMessageData {\\n            nextAvailablePixelTimestamp\\n            __typename\\n          }\\n          ... on SetPixelResponseMessageData {\\n            timestamp\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
            "method": "POST"
      
            })
            const postData = await postResponse.json();
            const postString = JSON.stringify(postData)
            //console.log(postData)
            let date_ob = new Date();
            console.log(" at " + date_ob.getHours() + ":" + date_ob.getMinutes() + " account: " + account)
    
            if (postString.includes("error")){
                console.log("error: ")
                console.log(postString)
            } else {
                console.log(postString.includes("error"))
            }
        }
        await sleep(302000) //wait 5 mins and 2 seconds for safety
    }
}

// Background script will send token
browser.runtime.onMessage.addListener(function (msg, sendResponse) {
    token = msg;
    console.log("token", token);

    if (running === false) {
        run(token).then(result => console.log(result));    
    }
});

console.log("hello world");
