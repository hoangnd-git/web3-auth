const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

const signData = '';
const privateKey = '';

const signature = web3.eth.accounts.sign(signData, privateKey);

console.log(signature);
