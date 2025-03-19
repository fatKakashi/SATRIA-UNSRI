import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getContract } from '../../src/blockchainFoundation.js';

// Mock ethers module with the importOriginal syntax
vi.mock('ethers', async () => {
  // No need for importOriginal since we're fully mocking
  const mockSigner = {
    getAddress: vi.fn().mockResolvedValue('0x123456789')
  };
  
  const mockContract = {
    mintCertificate: vi.fn().mockResolvedValue({
      wait: vi.fn().mockResolvedValue({})
    })
  };
  
  // Return a mock object with the expected functions
  return {
    ethers: {
      BrowserProvider: vi.fn().mockImplementation(() => ({
        send: vi.fn().mockResolvedValue([]),
        getSigner: vi.fn().mockResolvedValue(mockSigner)
      })),
      Contract: vi.fn().mockImplementation(() => mockContract)
    },
    // Also export directly for default import usage
    BrowserProvider: vi.fn().mockImplementation(() => ({
      send: vi.fn().mockResolvedValue([]),
      getSigner: vi.fn().mockResolvedValue(mockSigner)
    })),
    Contract: vi.fn().mockImplementation(() => mockContract)
  };
});

// Import ethers after mocking
import { ethers } from 'ethers';

describe('Blockchain Foundation', () => {
  beforeEach(() => {
    // Setup window.ethereum for tests
    global.window = {
      ethereum: {
        request: vi.fn().mockResolvedValue(['0x123456789'])
      }
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a contract when MetaMask is available', async () => {
    const result = await getContract();
    
    // Check that provider was created with window.ethereum
    expect(ethers.BrowserProvider).toHaveBeenCalledWith(window.ethereum);
    
    // Check that result has expected properties
    expect(result).toHaveProperty('contract');
    expect(result).toHaveProperty('signer');
    
    // Check that Contract was created with correct parameters
    expect(ethers.Contract).toHaveBeenCalled();
  });

  it('should throw an error when MetaMask is not available', async () => {
    // Remove ethereum from window
    delete window.ethereum;
    
    // Check that getContract throws the expected error
    await expect(getContract()).rejects.toThrow('MetaMask is not installed');
  });
});