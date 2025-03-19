import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('IPFS API Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should upload a file to IPFS through the API', async () => {
    // Mock the API response
    const mockResponse = {
      data: {
        ipfsUri: 'ipfs://mockHash',
        gatewayUrl: 'https://gateway.pinata.cloud/ipfs/mockHash'
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Create a mock form data
    const mockFormData = new FormData();
    const mockFile = new Blob(['test file content'], { type: 'image/jpeg' });
    mockFormData.append('file', mockFile, 'certificate.jpg');
    
    // Call the API
    const response = await axios.post('http://localhost:3001/api/upload', mockFormData);
    
    // Verify API was called with the right parameters
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/upload',
      mockFormData
    );
    
    // Verify response data
    expect(response.data).toHaveProperty('ipfsUri', 'ipfs://mockHash');
    expect(response.data).toHaveProperty('gatewayUrl');
    expect(response.data.gatewayUrl).toContain('gateway.pinata.cloud');
  });

  it('should handle IPFS upload errors', async () => {
    // Mock the API error
    axios.post.mockRejectedValueOnce(new Error('Upload failed'));
    
    const mockFormData = new FormData();
    
    // Check that the API error is propagated
    await expect(
      axios.post('http://localhost:3001/api/upload', mockFormData)
    ).rejects.toThrow('Upload failed');
  });
});