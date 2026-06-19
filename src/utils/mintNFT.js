import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

export async function mintNFT({ player, score, imageBlob, publicKey, wallet }) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Check wallet has enough SOL (needs ~0.015 SOL for mint)
  const balance = await connection.getBalance(publicKey);
  if (balance < 15_000_000) {
    throw new Error(
      `Not enough devnet SOL. You have ${(balance / 1e9).toFixed(4)} SOL — need ~0.015. Get free SOL at faucet.solana.com`
    );
  }

  // Convert canvas image to base64 data URL (no external upload needed)
  const ab = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(ab)));
  const imageDataUri = `data:image/png;base64,${base64}`;

  // Build metadata object
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

  // Upload metadata JSON to a free public host (no auth, no SOL needed)
  let metadataUri;
  try {
    const res = await fetch("https://api.npoint.io/json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });
    if (!res.ok) throw new Error("npoint upload failed");
    const { id } = await res.json();
    metadataUri = `https://api.npoint.io/${id}`;
  } catch {
    // Fallback: encode metadata as a data URI
    const metaBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(metadata))));
    metadataUri = `data:application/json;base64,${metaBase64}`;
  }

  // Mint the NFT on Solana devnet
  const metaplex = Metaplex.make(connection).use(
    walletAdapterIdentity(wallet.adapter)
  );

  const { nft, response } = await metaplex.nfts().create({
    uri: metadataUri,
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    sellerFeeBasisPoints: 0,
    isMutable: true,
  });

  // Return the transaction signature for the Explorer link
  return response.signature;
}
