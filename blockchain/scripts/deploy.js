const fs = require('fs');

async function main() {
    // This will get the contract factory which provides an abstraction to deploy and interact with contracts
    const UserAuthentication = await ethers.getContractFactory("UserAuthentication");

    // This will deploy the contract and return a promise that resolves to a contract object
    // Use this object to interact with your deployed contract
    const userAuth = await UserAuthentication.deploy();
    await userAuth.deployed();

    console.log("UserAuthentication deployed to:", userAuth.address);
    fs.writeFileSync('../frontend/public/contractAddress.json', JSON.stringify({ address: userAuth.address }));

}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
