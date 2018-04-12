const fs = require('fs')
const getPixels = require('get-pixels')
const zeros = require('zeros')

function averagePixels(pixelArrays){
    let runningSums = [];

    let newPixels = zeros([
        pixelArrays[0].shape[1],
        pixelArrays[0].shape[0],
        pixelArrays[0].shape[2]
    ]); // width and height need to be inverted for some reason
    let count = pixelArrays.length;

    for(let i = 0; i < pixelArrays.length; i++){
        let ar = pixelArrays[i];
        for(let j = 0; j < ar.data.length; j++){
            let baseNumber = newPixels.data[j];
            let newNumber = ar.data[j];
            let baseNumberSquared = baseNumber * baseNumber;
            let newNumberSquared = newNumber * newNumber;
            newPixels.data[j] += newNumber; // total now is the running sum
        }
    }

    for(let i = 0; i < newPixels.data.length; i++){
        let average = newPixels.data[i] / count;
        newPixels.data[i] = Math.floor(average);
    }

    return newPixels;
}

function getAllImagePixels(filePaths, next){
    let numImages = filePaths.length;
    let pixelArrays = [];
    let count = 0;
    for(var i = 0; i < numImages; i++){
        let fileName = filePaths[i];
        getPixels(fileName, function(err, pixels){
           
            count++;
            if(err){
                next(new Error(`${fileName} had an error!`));
                return;
            }
            pixelArrays.push(pixels);
            
            if(count >= numImages){
                next(null, pixelArrays);
            }
        });
    }
}


module.exports = function picAverage(files, next){
    getAllImagePixels(files, function(err, pixelArrays){
        if(err){
            next(err);
        }
        let averagedPixels = averagePixels(pixelArrays);
        next(null, averagedPixels);
    });
}