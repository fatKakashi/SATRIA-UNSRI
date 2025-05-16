  // blockchainFoundation.js
  import { ethers } from "ethers";
  import CertificateNFTABI from "./abis/CertificateNFT.json";

  const contractAddress = "0x42699A7612A82f1d9C36148af9C77354759b210b";

  export const getContract = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner(); // Add await here
      const contract = new ethers.Contract(contractAddress, CertificateNFTABI, signer);
      return { contract, signer };
    } else {
      throw new Error("MetaMask is not installed or window.ethereum is undefined");
    }
  };

  export const getTokensByOwner = async (walletAddress) => {
    try {
      const { contract } = await getContract();
      const tokenIds = await contract.getTokensByOwner(walletAddress);

      // Fetch metadata for each token
      const tokenData = await Promise.all(
        tokenIds.map(async (tokenId) => {
          const tokenURI = await contract.tokenURI(tokenId);
          return { tokenId, tokenURI };
        })
      );

      return tokenData;
    } catch (error) {
      console.error("Error fetching tokens by owner:", error);
      throw error;
    }
  };