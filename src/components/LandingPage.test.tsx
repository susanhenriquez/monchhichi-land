import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingPage from './LandingPage';

// Helper function to create a test file
const createTestFile = (name = 'test-image.jpg', type = 'image/jpeg') => {
  return new File(['test content'], name, { type });
};

// Helper function to fill form properly
const fillForm = async (name: string, owner: string, description = '') => {
  const monchhichiNameInput = screen.getByLabelText(/monchhichi name/i);
  const ownerNameInput = screen.getByLabelText(/your name/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  
  fireEvent.change(monchhichiNameInput, { target: { value: name } });
  fireEvent.change(ownerNameInput, { target: { value: owner } });
  if (description) {
    fireEvent.change(descriptionInput, { target: { value: description } });
  }
  
  // Upload file and wait for it to be processed
  const fileInput = document.getElementById('image-upload') as HTMLInputElement;
  const testFile = createTestFile();
  await userEvent.upload(fileInput, testFile);
  
  // Wait for the image preview to appear, confirming the file was processed
  await waitFor(() => {
    expect(screen.getByAltText('Monchhichi preview')).toBeInTheDocument();
  });
};

describe('LandingPage', () => {
  test('renders both UploadForm and Collection components', () => {
    render(<LandingPage />);
    
    // Check UploadForm is present
    expect(screen.getByText('Share Your Monchhichi')).toBeInTheDocument();
    expect(screen.getByLabelText(/monchhichi name/i)).toBeInTheDocument();
    
    // Check Collection is present (empty state)
    expect(screen.getByText('Community Collection')).toBeInTheDocument();
    expect(screen.getByText('No Monchhichi dolls in the collection yet!')).toBeInTheDocument();
  });

  test('starts with empty collection', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('No Monchhichi dolls in the collection yet!')).toBeInTheDocument();
    expect(screen.getByText('Be the first to share your beloved companion.')).toBeInTheDocument();
  });

  test('adds new Monchhichi to collection when form is submitted', async () => {
    render(<LandingPage />);
    
    // Fill out the form
    await fillForm('Fluffy', 'Susan', 'My beloved Monchhichi');
    
    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    // Check that the item appears in the collection
    await waitFor(() => {
      expect(screen.getByText('Fluffy')).toBeInTheDocument();
      expect(screen.getByText('by Susan')).toBeInTheDocument();
      expect(screen.getByText('My beloved Monchhichi')).toBeInTheDocument();
      expect(screen.getByText('1 Monchhichi in our collection')).toBeInTheDocument();
    });
    
    // Check that empty state is no longer shown
    expect(screen.queryByText('No Monchhichi dolls in the collection yet!')).not.toBeInTheDocument();
  });

  test('adds multiple Monchhichis to collection', async () => {
    render(<LandingPage />);
    
    // Add first Monchhichi
    await fillForm('Fluffy', 'Susan');
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText('Fluffy')).toBeInTheDocument();
    });
    
    // Add second Monchhichi
    await fillForm('Sweetie', 'John');
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText('Sweetie')).toBeInTheDocument();
      expect(screen.getByText('2 Monchhichis in our collection')).toBeInTheDocument();
    });
    
    // Both should be visible
    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('by Susan')).toBeInTheDocument();
    expect(screen.getByText('Sweetie')).toBeInTheDocument();
    expect(screen.getByText('by John')).toBeInTheDocument();
  });

  test('newest Monchhichi appears first in collection', async () => {
    render(<LandingPage />);
    
    // Add first Monchhichi
    await fillForm('First', 'User1');
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText('First')).toBeInTheDocument();
    });
    
    // Add second Monchhichi
    await fillForm('Second', 'User2');
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
    
    // Check order - newest (Second) should appear first
    const monchhichiNames = screen.getAllByRole('heading', { level: 3 });
    expect(monchhichiNames[0]).toHaveTextContent('Second');
    expect(monchhichiNames[1]).toHaveTextContent('First');
  });

  test('form resets after successful submission', async () => {
    render(<LandingPage />);
    
    const monchhichiNameInput = screen.getByLabelText(/monchhichi name/i);
    const ownerNameInput = screen.getByLabelText(/your name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    // Fill form
    await fillForm('Fluffy', 'Susan', 'My beloved Monchhichi');
    
    // Submit
    fireEvent.submit(screen.getByRole('form'));
    
    // Wait for submission and check form is reset
    await waitFor(() => {
      expect(monchhichiNameInput).toHaveValue('');
      expect(ownerNameInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
      expect(screen.getByText('Click to upload your Monchhichi photo')).toBeInTheDocument();
    });
  });

  test('generates unique IDs for each Monchhichi', async () => {
    render(<LandingPage />);
    
    // Create a mock to track the generated IDs
    const originalRandom = Math.random;
    const mockRandomValues = [0.123, 0.456];
    let callCount = 0;
    Math.random = () => mockRandomValues[callCount++] || 0.789;
    
    const originalDate = Date.now;
    const mockTimestamps = [1000000, 2000000];
    let timestampCallCount = 0;
    Date.now = () => mockTimestamps[timestampCallCount++] || 3000000;
    
    try {
      // Add two Monchhichis
      for (let i = 0; i < 2; i++) {
        await fillForm(`Monchhichi${i + 1}`, `User${i + 1}`);
        fireEvent.submit(screen.getByRole('form'));
        
        await waitFor(() => {
          expect(screen.getByText(`Monchhichi${i + 1}`)).toBeInTheDocument();
        });
      }
      
      // Both items should be visible (confirming they have unique IDs)
      expect(screen.getByText('Monchhichi1')).toBeInTheDocument();
      expect(screen.getByText('Monchhichi2')).toBeInTheDocument();
      expect(screen.getByText('2 Monchhichis in our collection')).toBeInTheDocument();
    } finally {
      // Restore original functions
      Math.random = originalRandom;
      Date.now = originalDate;
    }
  });

  test('has proper layout structure', () => {
    render(<LandingPage />);
    
    const landingPage = document.querySelector('.landing-page');
    const mainContent = document.querySelector('.main-content');
    const uploadSection = document.querySelector('.upload-section');
    const collectionSection = document.querySelector('.collection-section');
    
    expect(landingPage).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    expect(uploadSection).toBeInTheDocument();
    expect(collectionSection).toBeInTheDocument();
  });
}); 