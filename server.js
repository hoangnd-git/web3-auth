const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/verify-sign', (req, res) => {
  const expTime = 15 * 60;

  const [walletAddress, exp] = req.body.signData.split('@');

  // verify signature
  const recoverRes = web3.eth.accounts.recover(
    req.body.signData,
    req.body.signature
  );
  if (recoverRes !== walletAddress) {
    throw 'signature is invalid';
  }

  // verify expire time of signature
  const currentTime = new Date().getTime() / 1000;
  if (currentTime > exp + expTime) {
    throw 'signature is expired';
  }

  res.send('Return JWT access token');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
