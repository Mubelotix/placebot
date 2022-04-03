if (typeof browser === "undefined") {
    var browser = chrome;
}

var token = undefined;
var running = false;
//let beginx = 965
//let beginy = 465
//let width = 100
//let height = 45
//let color = 8
//let rows = 0
//let chars = 0

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function loadVars(url) {
	let response = await fetch(url);
		
	if(response.status != 200) {
		throw new Error("Server Error");
	}
		
	// read response stream as text
	let text_data = await response.text();
	text_data = text_data.split('\n');

	return text_data;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// All this code was copied https://github.com/Luigit12/placeBot
async function run() {
    running = true;
	document.getElementsByTagName("h1")[0].innerText = "Thank you for contributing to Monero's r/place! The bot is running."
	var vars = await loadVars("https://raw.githubusercontent.com/Mubelotix/placebot/master/vars");
	let beginx = parseInt(vars[0]);
	let beginy = parseInt(vars[1]);
	let width = parseInt(vars[2]);
	let height = parseInt(vars[3]);
	let color = parseInt(vars[4]);
	let rows = parseInt(vars[5]);
	let chars = parseInt(vars[6]);

    main_loop: for (let i = 0; i < 10000; i++) {
        let image = await loadVars("https://raw.githubusercontent.com/Mubelotix/placebot/master/image");
        let bearer = token;
        let accounts = bearer.split('\n')
    
        for (const account of accounts) {
            //const lines = image.split('\n')
			lines = image
            rows = getRandomInt(0, height - 1)
            chars = getRandomInt(0, width - 1)
            x = beginx + chars
            y = beginy + rows
    
            console.log(`${account} ${x} ${y} ${lines} ${chars} ${rows}`);
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
                console.log("unrecognized char. report this to our discord!")
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
        await sleep(302000+getRandomInt(3200, 12000)) //waits 5 mins and 3.2 seconds to 12 seconds
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

// Refresh page after an hour (I think the token is only available when loading the page, and the token might expire)
setInterval(function () { window.location.reload(); }, 3600000);
