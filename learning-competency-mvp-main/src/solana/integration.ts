import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import fs from "node:fs";
import { createAttestationOnChain } from "./attest.js";
import { verifyAttestation } from "./verify.js";
import type { ReviewedStateRecord } from "../provenance/trace.js";

const NETWORK = "https://api.devnet.solana.com";

async function main() {
  const secret = process.env.SOLANA_PRIVATE_KEY;
  if (!secret) throw new Error("SOLANA_PRIVATE_KEY is required for the real Devnet integration test.");

  const keypair = Keypair.fromSecretKey(bs58.decode(secret));
  const record = JSON.parse(fs.readFileSync("out/reviewed-state.json", "utf8")) as ReviewedStateRecord;

  const connection = new Connection(NETWORK, "confirmed");
  const balance = await connection.getBalance(keypair.publicKey);
  if (balance < 100_000) {
    throw new Error("Devnet wallet has insufficient SOL. Fund the configured signer before running this integration test.");
  }

  const signature = await createAttestationOnChain(record, secret);
  const result = await verifyAttestation(record.record_hash, signature, NETWORK, {
    record,
    expectedSigner: keypair.publicKey.toBase58(),
  });

  if (!result.verified) {
    throw new Error(`Real Devnet verification failed: ${result.error ?? "unknown error"}`);
  }

  console.log(JSON.stringify({
    verified: true,
    network: "devnet",
    signature,
    record_hash: record.record_hash,
    checks: result.checks,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
