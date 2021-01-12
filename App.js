const axios = require('axios');
const fs = require('fs');
const {Base64} = require('js-base64');

main()


//https://stackoverflow.com/questions/29283040/how-to-add-custom-certificate-authority-ca-to-nodejs

async function main(){
    //let shard = `http://127.0.0.1:${port}/lol-champ-select/v1/current-champion`
    
    let lfURL = "C:\\Riot Games\\League of Legends\\lockfile"
    console.log(lfURL)

    let port = await getPort(lfURL);
    let password = await getPassword(lfURL);
    let shard = "https://127.0.0.1" + `:${port}` + "/lol-summoner/v1/current-summoner"

    console.log(password + " " + port)
    console.log(shard)

    let config = {
        headers:{
            //method.addHeader("Authorization", "Basic " + token);
            //method.addHeader("Accept", "*/*");
            Authorization: "Basic " + password,
            Accept: "*/*",
        }
    }

    //Making the request!
    axios.get(shard, config)
    .then(function (response) {
        // handle success
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        console.log(error)
    })
    .then(function () {
        // always executed
    });


}


function getPort(lfURL){
    let port; 

    return new Promise((resolve, reject) => {
        fs.readFile(lfURL, (err,data) => {
            let lfContents = data.toString().split(":")
            port = lfContents[2]

            resolve(port)
        }) 

    }) //end of promise   
}


function getPassword(lfURL){
    let password; 

    return new Promise((resolve, reject) => {
        fs.readFile(lfURL, (err,data) => {
            let lfContents = data.toString().split(":")
            console.log("before: " + lfContents[3])
            password = Base64.encode("riot:" + lfContents[3])
            //password = Base64.encode("riot :" + lfContents[3])
            //HAHAHAHAHAHAHAHAHAHAHA

            console.log(password)

            resolve(password)
        }) 

    }) //end of promise   
}
