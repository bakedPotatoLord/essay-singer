import tone, { MAX_8 } from 'tonegenerator';
// Use this package to write a header for the wave file
// https://www.npmjs.org/package/waveheader
import header from 'waveheader';
import { createWriteStream, readFile } from 'fs';
 
var file = createWriteStream('8bit-example.wav')
var samples = tone({ freq: 440, lengthInSecs: 0.5, volume: MAX_8 })
 
var fullSound = []

readFile("essay.txt",'utf8',(err,data)=>{

  const parsedData = Array.from( data.split(""), x=> x.charCodeAt(0) )
  console.log(parsedData)

  for(let i of parsedData){
    fullSound= fullSound.concat(this,tone({ freq: i*2, lengthInSecs: 0.05, volume: MAX_8, shape:"sine" }))
  }
  
  //console.log(fullSound)
  
  file.write(header(fullSound.length, {
    bitDepth: 8
  }))
  // Convert -128 -> 127 range into 0 -> 255
  var data = Uint8Array.from(fullSound, function (val) {
    return val + 128
  })
  var buffer = Buffer.from(data)
  file.write(buffer)
  file.end()

})




function soundPicker(){
  return (Math.random() * 500) +200
}