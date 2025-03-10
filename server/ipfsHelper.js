const { create } = require('ipfs-http-client');
const fs = require('fs');

const ipfs = create({ url: 'http://127.0.0.1:500' });

async function uploadFileToIPFS(filePath) {
    try {
      // Read the file from disk
      const file = fs.readFileSync(filePath);
      // Upload the file to IPFS
      const result = await ipfs.add(file);
      // Return the IPFS URL using the CID
      return `ipfs://${result.path}`;
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw error;
    }
  }
  
  module.exports = { uploadFileToIPFS };
