import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  Metaplex,
  walletAdapterIdentity,
  irysStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";

export async function mintNFT({ player, score, imageBlob, publicKey, wallet }) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet.adapter))
    .use(
      irysStorage({
        address: "https://devnet.irys.xyz",
        providerUrl: clusterApiUrl("devnet"),
        timeout: 60000,
      })
    );

  // Convert blob to Metaplex file
  const ab = await imageBlob.arrayBuffer();
  const imageMetaplexFile = toMetaplexFile(new Uint8Array(ab), "player-card.png", {
    contentType: "image/png",
  });

  // Upload image
  const imageUri = await metaplex.storage().upload(imageMetaplexFile);

  // Build metadata
  const metadata = {
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    description: player.description,
    image: imageUri,
    attributes: [
      { trait_type: "Player", value: player.name },
      { trait_type: "Country", value: player.country },
      { trait_type: "Position", value: player.position },
      { trait_type: "Vibe", value: player.vibeTitle },
      { trait_type: "Energy Score", value: String(score) },
    ],
    properties: {
      files: [{ uri: imageUri, type: "image/png" }],
      category: "image",
    },
  };

  const { uri } = await metaplex.nfts().uploadMetadata(metadata);

  const { nft } = await metaplex.nfts().create({
    uri,
    name: `World Cup Vibe: ${player.name}`,
    symbol: "WCVIBE",
    sellerFeeBasisPoints: 0,
    isMutable: true,
  });

  return nft.address.toBase58();
}
