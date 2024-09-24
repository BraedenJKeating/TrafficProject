const hre = require("hardhat");

async function main() {
  const Photo = await hre.ethers.getContractFactory("photo"); // fetching bytecode and ABI
  const photo = await Photo.deploy(); // create instance of smart contract

  await photo.deployed(); //deploying smart contract

  console.log("Deployed contract address:", photo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  //0x4E6f8F435189f22bE78d3Ab5bAe47145148FC9cc
