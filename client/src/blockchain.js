import { ethers } from "ethers";
import CertificateNFTABI from "./abis/CertificateNFT.json"; // Paste your ABI here
const contractAddress = "0xYourDeployedContractAddress"; // Replace with your contract address

export const getContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CertificateNFTABI, signer);
    return { contract, signer };
  } else {
    throw new Error("MetaMask is not installed");
  }
};
