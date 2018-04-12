pic-average
==========
Given an array of image paths, pic-average will return a new `ndarray` contains an average of all the pictures.

Usage
=========
`require('./pic-average')(files, cb(err, pixels))`
Averages all the pixels from the supplied files into an ndarray.
* `files` array of file paths
* `cb(err,pixels)` callback which is triggered when new images are created 

Example
==========
```
const fs = require('fs');
const savePixels = require('save-pixels');
const picAverage = require('./pic-average');

const fileNames = [];

fs.readdirSync(`C:\pictures`).filter(function(file){
    if(file.indexOf('.png') > -1){
        fileNames.push(`C:/pictures/${file}`);
    }
});

picAverage(fileNames, function(err, pixels){
    if(err){
        console.error(err);
        return;
    }

    let file = fs.createWriteStream(`newimage.png`);
    savePixels(pixels, "png").pipe(file);
});

```

### Input
![Example Input 1](/test/pic1.png)
![Example Input 2](/test/pic2.png)

### Output
![Example Output](/test/test.png)

Note: for some reason the image is sideways. So you will have to rotate outside of this module.
