  // blockchainFoundation.js
  import { ethers } from "ethers";
  import CertificateNFTABI from "./abis/CertificateNFT.json";

  const contractAddress = "0x05d91B9031A655d08E654177336d08543ac4B711";

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