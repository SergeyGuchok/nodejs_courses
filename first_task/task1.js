import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Write a line and I will reverse it :)')

rl.on('line', (input) => {
  console.log(input.trim().split('').reverse().join(''))
})