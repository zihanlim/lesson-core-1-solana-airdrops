import * as fs from "fs";
import * as Web3 from "@solana/web3.js";

// Return existing Keypair or initialize and return new Keypair
export const initializeKeypair = async (): Promise<Web3.Keypair> => {
  if (!process.env.PRIVATE_KEY) {
    console.log("Generating new keypair... 🗝️");
    const signer = Web3.Keypair.generate();

    console.log("Creating .env file");
    fs.writeFileSync(".env", `PRIVATE_KEY=[${signer.secretKey.toString()}]`);

    return signer;
  }

  // Question: Why do we need to parse the private_key from process.env.PRIVATE_KEY?
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecret;
};

// Request SOL if balance is less than 1
export const airdropSolIfNeeded = async (
  signer: Web3.Keypair,
  connection: Web3.Connection
) => {
  // Get signer balance
  const balance= await connection.getBalance(signer.publicKey);
  console.log('Current balance is', balance / Web3.LAMPORTS_PER_SOL, 'SOL');
  // Check if the signer has less than 1 SOL
  { if (balance / Web3.LAMPORTS_PER_SOL<1){
    console.log('Airdropping 1 SOL.')
  }
    // Request airdrop using connection.requestAirdrop
    // Confirm the transaction using connection.confirmTransaction
    // Check the new balance
  }
};
