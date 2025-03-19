// ipfsHelper.js
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');

// Replace with your Pinata credentials
const PINATA_API_KEY = '0cdac221ca17b7f5dfa8';
const PINATA_API_SECRET = '2ce42d6ac3ce75328434f956274559a8ad2c30b8c95c19867dc165a260559859';
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

async function uploadFileToIPFS(filePath) {
  try {
    // Read file as stream
    const readableStreamForFile = fs.createReadStream(filePath);
    const fileName = filePath.split('/').pop();
    
    // Upload to Pinata
    const options = {
      pinataMetadata: {
        name: fileName,
      },
    };
    
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    console.log("Pinned file to IPFS:", result);
    
    // Return both IPFS URI and gateway URL
    return {
      ipfsUri: `ipfs://${result.IpfsHash}`,
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    };
  } catch (error) {
    console.error("Pinata upload failed:", error);
    throw error;
  }
}

async function uploadJSONToIPFS(jsonData) {
  try {
    const options = {
      pinataMetadata: {
        name: 'certificate-metadata.json',
      },
    };
    
    const result = await pinata.pinJSONToIPFS(jsonData, options);
    console.log("Pinned JSON to IPFS:", result);
    
    return {
      ipfsUri: `ipfs://${result.IpfsHash}`,
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    };
  } catch (error) {
    console.error("Pinata JSON upload failed:", error);
    throw error;
  }
}

module.exports = { uploadFileToIPFS, uploadJSONToIPFS };