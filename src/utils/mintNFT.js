import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

// Upload metadata JSON to a free public JSON store and return a short HTTPS URL.
// Metaplex Token Metadata program has a 200-char URI limit — data URIs won't fit.
async function uploadMetadataJson(metadata) {
  // Try jsonblob.com — free, no auth, returns a short URL
  try {
    const res = await fetch("https://jsonblob.com/api/jsonBlob", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(metadata),
    });
    if (res.ok) {
      // URL is in the Location header e.g. https://jsonblob.com/api/jsonBlob/123
      const location = res.headers.get("Location");
      if (location) return location;
    }
  } catch (_) {}

  // Fallback: jsonkeeper.com
  try {
    const res = await fetch("https://jsonkeeper.com/b/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });
    if (res.ok) {
      const { id } = await res.json();
      if (id) return `https://jsonkeeper.com/b/${id}`;
    }
  } catch (_) {}

  throw new Error(
    "Could not host NFT metadata. Check your internet connection and try again."
  );
}

export async function mintNFT({ player, score, publicKey, wallet }) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Check wallet has enough devnet SOL (~0.015 SOL needed)
  const balance = await connection.getBalance(publicKey);
  if (balance < 15_000_000) {
    throw new Error(
      `Not enough devnet SOL — you have ${(balance / 1e9).toFixed(4)} SOL, need ~0.015. ` +
        `Get free SOL at faucet.solana.com`
    );
  }

  // Use a styled placeholder image (no upload needed)
  const imageUrl = `https://placehold.co/400x560/0d1a2e/eab308.png?text=${encodeURIComponent(
    player.name + "\n" + score + "% Energy"
  )}`;

  const metadata = {
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    description: player.description,
    image: imageUrl,
    attributes: [
      { trait_type: "Player", value: player.name },
      { trait_type: "Country", value: player.country },
      { trait_type: "Position", value: player.position },
      { trait_type: "Vibe", value: player.vibeTitle },
      { trait_type: "Energy Score", value: String(score) },
    ],
    properties: {
      files: [{ uri: imageUrl, type: "image/png" }],
      category: "image",
    },
  };

  // Get a short HTTPS URL for the metadata (required by Token Metadata program)
  const metadataUri = await uploadMetadataJson(metadata);

  // Mint on Solana devnet
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

  return response.signature;
}
