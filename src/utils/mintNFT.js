import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

// Safe base64 encode that won't stack-overflow on large arrays
function uint8ToBase64(bytes) {
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// Build a metadata data URI — stored directly on-chain, no upload service needed
function buildMetadataDataUri(player, score, imageDataUri) {
  const metadata = {
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    description: player.description,
    image: imageDataUri,
    attributes: [
      { trait_type: "Player", value: player.name },
      { trait_type: "Country", value: player.country },
      { trait_type: "Position", value: player.position },
      { trait_type: "Vibe", value: player.vibeTitle },
      { trait_type: "Energy Score", value: String(score) },
    ],
    properties: {
      files: [{ uri: imageDataUri, type: "image/png" }],
      category: "image",
    },
  };
  const json = JSON.stringify(metadata);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return `data:application/json;base64,${b64}`;
}

export async function mintNFT({ player, score, imageBlob, publicKey, wallet }) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Check SOL balance — need ~0.015 SOL for the mint transaction
  const balance = await connection.getBalance(publicKey);
  if (balance < 15_000_000) {
    throw new Error(
      `Insufficient devnet SOL. You have ${(balance / 1e9).toFixed(4)} SOL but need ~0.015. ` +
        `Get free devnet SOL at faucet.solana.com`
    );
  }

  // Convert canvas PNG to base64 data URI (safe chunked encode)
  const ab = await imageBlob.arrayBuffer();
  const imageDataUri = `data:image/png;base64,${uint8ToBase64(new Uint8Array(ab))}`;

  // Build metadata URI (data URI stored on-chain — no external service required)
  const metadataUri = buildMetadataDataUri(player, score, imageDataUri);

  // Mint NFT on Solana devnet
  const metaplex = Metaplex.make(connection).use(
    walletAdapterIdentity(wallet.adapter)
  );

  const { response } = await metaplex.nfts().create({
    uri: metadataUri,
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    sellerFeeBasisPoints: 0,
    isMutable: true,
  });

  // response.signature is the transaction signature
  return response.signature;
}
