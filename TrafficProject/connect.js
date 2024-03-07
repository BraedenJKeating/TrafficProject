import { MetaMaskSDK } from '@metamask/sdk';

//initalize 

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example Javascript Dapp",
    url: window.location.host,
  }
});

const ethereum = MMSDK.getProvider();

// prompt users to connect

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
