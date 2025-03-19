import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Minting from '../../src/Minting';
import axios from 'axios';
import * as blockchainFoundation from '../../src/blockchainFoundation';
import { StudentContext } from '../../src/StudentContext';

// Add testing-library/jest-dom matchers
import '@testing-library/jest-dom';

// Mock StudentContext value
const mockStudentData = {
  nim: '123456',
  name: 'Test Student'
};

const mockSetStudentData = vi.fn();

// Mock React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

// Mock the blockchain foundation
vi.mock('../../src/blockchainFoundation.js', () => ({
  getContract: vi.fn()
}));

describe('Minting Component', () => {
  const mockWalletAddress = '0x123456789';
  const mockApprovedSubmissions = [
    {
      _id: '1',
      nim: '123456',
      studentName: 'Test Student',
      type: 'Prestasi Lomba',
      tahunKegiatan: '2023',
      namaKegiatan: 'Test Competition',
      note: 'Test Note',
      metadataUrl: 'ipfs://mockHash',
      metadataGatewayUrl: 'https://gateway.pinata.cloud/ipfs/mockHash',
      imageUrl: 'ipfs://mockImageHash'
    }
  ];

  const mockTransaction = {
    wait: vi.fn().mockResolvedValue({})
  };

  const mockContract = {
    mintCertificate: vi.fn().mockResolvedValue(mockTransaction)
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock axios responses
    axios.get.mockImplementation((url) => {
      if (url.includes('checkdatamahasiswa')) {
        return Promise.resolve({ data: mockStudentData });
      }
      if (url.includes('approved')) {
        return Promise.resolve({ data: mockApprovedSubmissions });
      }
      return Promise.reject(new Error('Not found'));
    });

    // Mock blockchain foundation
    blockchainFoundation.getContract.mockResolvedValue({
      contract: mockContract,
      signer: {}
    });

    // Mock fetch for metadata
    global.fetch = vi.fn().mockImplementation((url) => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          name: 'Test Certificate',
          description: 'Test Description',
          image: 'https://gateway.pinata.cloud/ipfs/mockImageHash'
        })
      });
    });
  });

  // Helper function to render with context
  const renderWithContext = (ui) => {
    return render(
      <StudentContext.Provider value={{ studentData: mockStudentData, setStudentData: mockSetStudentData }}>
        {ui}
      </StudentContext.Provider>
    );
  };

  it('renders the minting page with submissions', async () => {
    renderWithContext(<Minting walletAddress={mockWalletAddress} />);
    
    // Wait for data to load
    await waitFor(() => {
      // Check that the wallet address is displayed
      expect(screen.getByText(mockWalletAddress.slice(0, 6) + '...' + mockWalletAddress.slice(-4))).toBeInTheDocument();
    });
  });

  it('opens the terms modal when trying to mint', async () => {
    renderWithContext(<Minting walletAddress={mockWalletAddress} />);
    
    // Wait for data to load and find MINT button
    await waitFor(() => {
      expect(screen.getAllByText('MINT')[0]).toBeInTheDocument();
    });
    
    // Click the first MINT button
    fireEvent.click(screen.getAllByText('MINT')[0]);
    
    // Check that terms modal is shown
    expect(screen.getByText('Terms & Condition')).toBeInTheDocument();
    expect(screen.getByText('SETUJU')).toBeInTheDocument();
  });

  it('allows minting after agreeing to terms', async () => {
    renderWithContext(<Minting walletAddress={mockWalletAddress} />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getAllByText('MINT')[0]).toBeInTheDocument();
    });
    
    // Click the first MINT button to open terms modal
    fireEvent.click(screen.getAllByText('MINT')[0]);
    
    // Agree to terms
    const agreeButton = screen.getByText('SETUJU');
    fireEvent.click(agreeButton);
    
    // Open the NFT modal again
    await waitFor(() => {
      expect(screen.getAllByText('MINT')[0]).toBeInTheDocument();
    });
    
    // Click on the first MINT button to open the modal
    fireEvent.click(screen.getAllByText('MINT')[0]);
    
    // Click on the mint button in the modal (which might be the second MINT button)
    await waitFor(() => {
      expect(screen.getAllByText('MINT')[1]).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('MINT')[1]);
    
    // Check that getContract was called
    await waitFor(() => {
      expect(blockchainFoundation.getContract).toHaveBeenCalled();
    });
  });

  it('displays empty state when no submissions are available', async () => {
    // Override the mock to return empty array
    axios.get.mockImplementation((url) => {
      if (url.includes('approved')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({ data: mockStudentData });
    });
    
    renderWithContext(<Minting walletAddress={mockWalletAddress} />);
    
    // Check for empty state message
    await waitFor(() => {
      const element = screen.getByText('You have no certificate to mint');
      expect(element).toBeInTheDocument();
    });
  });
});