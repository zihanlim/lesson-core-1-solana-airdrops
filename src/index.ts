import * as Web3 from "@solana/web3.js";
import dotenv from "dotenv";
import { airdropSolIfNeeded, initializeKeypair } from "./utils";
dotenv.config();

const main = async () => {
  // Instantiate a connection with a Devnet RPC
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));

  // Return existing Keypair or initialize and return new Keypair
  // Question: Where does the keypair come from?
  const signer = await initializeKeypair();
  console.log("Public key:", signer.publicKey.toBase58());

  // Request SOL if balance is less than 1
  await airdropSolIfNeeded(signer, connection);
};

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
