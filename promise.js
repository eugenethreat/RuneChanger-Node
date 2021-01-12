const fs = require('fs')
const {Base64} = require('js-base64');

let base = "C:\\Riot Games\\League of Legends"
let lockfile = "\\lockfile"
main();

async function main(){
    
    //lockfile is dynamic, so gotta do things and stuff 
    let port = await getPort();
    //now waits for getPort to return 
    console.log(port)
}

function getPort(){
    let port; 

    return new Promise((resolve, reject) => {
        fs.readFile(base + lockfile, (err,data) => {
            let lfContents = data.toString().split(":")
            port = lfContents[2]

            resolve(port)
        }) 

    }) //end of promise   
}


