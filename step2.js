const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

function webCat(url){
    axios.get(url)
    .catch(function(error){
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    })
    .then(function(data){
        console.log(data);
    })
}

if (process.argv[2].startsWith('http')){
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}
