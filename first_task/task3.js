import path from 'path'
import fs from 'fs'
import csvToJson from 'csvtojson'
import { inputFilePath } from './constants'

const outputFilePath = path.join(__dirname, 'output/task3.txt')

const write = async () => {
  const fileContent = await csvToJson({ delimiter: ';' }).fromFile(inputFilePath)
  fs.writeFileSync(outputFilePath, JSON.stringify(fileContent), 'utf-8')
}

write()
  .then(() => console.log('Success!'))
  .catch(e => {
  console.log('Something went wrong')
  console.error(e)
})
