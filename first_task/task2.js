import path from 'path'
import fs from 'fs'
import csvToJson from 'csvtojson'
import { pipeline } from 'stream'
import { inputFilePath } from './constants'

const outputFilePath = path.join(__dirname, 'output/task2.txt')

const rStream = fs.createReadStream(inputFilePath)
const wStream = fs.createWriteStream(outputFilePath)

pipeline(rStream, csvToJson({ delimiter: ';' }), wStream, (err) => {
  if (err) {
    console.log('Pipeline failed, error below')
    console.error(err)
  } else {
    console.log('File has been written')
  }
})