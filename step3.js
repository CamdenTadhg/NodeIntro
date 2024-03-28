const fs = require('fs');
const process = require('process');
const axios = require('axios');

async function cat(array){
    for (let i=0; i<array.length; i++){
        try{
            const data = await fs.promises.readFile(array[i], 'utf8');
            console.log(data);
        }
        catch (err){
            console.error(`Error reading ${array[i]}: ${err}`);
            process.exit(1);
        }
    }
}


function catWrite(path1, path2){
    fs.readFile(path1, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path1}: ${err}`);
        }
        fs.writeFile(path2, data, 'utf8', function(err) {
            if(err) {
                console.error(`Error writing to ${path2}: ${err}`)
            }
        })
    })
}

async function webCat(array){
    for (let i=0; i<array.length; i++){
        try{
            const data = await axios.get(array[i]);
            console.log(data.data);
        }
        catch(err){
            console.error(`Error fetching ${array[i]}: ${err}`);
            process.exit(1);
        }
    }
}

async function webCatWrite(path1, path2){
    try {
        let data = await axios.get(path1);
        fs.writeFile(path2, data.data, 'utf8', err => {
            if (err){
                console.error(`Error writing to ${path2}: ${err}`);
            }
        })
    }
    catch(error) {
        console.error(`Error fetching ${path1}: ${error}`)
    }
}

if (process.argv[2] === '--out'){
    if (process.argv[4].startsWith('http')){
        webCatWrite(process.argv[4], process.argv[3]);
    }
    else {
        catWrite(process.argv[4], process.argv[3]);
    }
} else {
    if (process.argv[2].startsWith('http')){
        let argArray = []
        for (let i = 2; i < process.argv.length; i++){
            argArray.push(process.argv[i])
        }
        webCat(argArray);

    }
    else {
        let argArray = []
        for (let i = 2; i < process.argv.length; i++){
            argArray.push(process.argv[i])
        }
        cat(argArray);
    }
}
