const fs = require('fs');
const savePixels = require('save-pixels');
const picAverage = require('../pic-average');
const fileNames = [];
console.log(__dirname)

fs.readdirSync(__dirname).filter(function(file){
    if(file.indexOf('.png') > -1)
        fileNames.push(`${__dirname}/${file}`);
});

picAverage(fileNames, function(err, pixels){
    if(err){
        console.error(err);
        return;
    }

    let file = fs.createWriteStream(`${__dirname}/test.png`);
    savePixels(pixels, "png").pipe(file);

});

