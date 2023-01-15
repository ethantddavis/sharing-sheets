import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from 'dotenv'
import { isBytesLike, parseBytes32String } from "ethers/lib/utils";
dotenv.config()

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Sheets contract`);

  // Initialize the wallet.
  let wallet;
  if (isBytesLike(process.env.PRIV_KEY)) {
    wallet = new Wallet(process.env.PRIV_KEY);
  } else {
    wallet = undefined;
  }

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Sheets");

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // Deposit funds to L2
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: deploymentFee.mul(2),
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const sheetsContract = await deployer.deploy(artifact, []);

  //obtain the Constructor Arguments
  console.log("constructor args:" + sheetsContract.interface.encodeDeploy([]));

  // Show the contract info.
  const contractAddress = sheetsContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
