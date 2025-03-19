// blockchainFoundation.js
import { ethers } from "ethers";
import CertificateNFTABI from "./abis/CertificateNFT.json";

const contractAddress = "0x40AFDaF11410DA4015D95d710Bdfe01228BdD2F5";

export const getContract = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    // Use BrowserProvider instead of Web3Provider for ethers v6
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner(); // Add await here
    const contract = new ethers.Contract(contractAddress, CertificateNFTABI, signer);
    return { contract, signer };
  } else {
    throw new Error("MetaMask is not installed or window.ethereum is undefined");
  }
};