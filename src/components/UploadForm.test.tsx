import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadForm, { MonchhichiData } from './UploadForm';

// Mock function for onSubmit
const mockOnSubmit = jest.fn();

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

describe('UploadForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders upload form with all required elements', () => {
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    // Check for form elements
    expect(screen.getByText('Share Your Monchhichi')).toBeInTheDocument();
    expect(screen.getByText('Upload a photo of your beloved Monchhichi doll and add it to our community collection!')).toBeInTheDocument();
    expect(screen.getByLabelText(/monchhichi name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to collection/i })).toBeInTheDocument();
  });

  test('shows upload placeholder initially', () => {
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Click to upload your Monchhichi photo')).toBeInTheDocument();
    expect(screen.getByText('JPG, PNG, or GIF (max 5MB)')).toBeInTheDocument();
  });

  test('handles file upload and shows preview', async () => {
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    const testFile = createTestFile();
    
    await userEvent.upload(fileInput, testFile);
    
    await waitFor(() => {
      expect(screen.getByAltText('Monchhichi preview')).toBeInTheDocument();
      expect(screen.getByText('Change Image')).toBeInTheDocument();
    });
  });

  test('validates required fields before submission', async () => {
    // Mock alert to avoid actual alerts in tests
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields and upload an image');
    expect(mockOnSubmit).not.toHaveBeenCalled();
    
    alertSpy.mockRestore();
  });

  test('submits form with valid data', async () => {
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    // Fill the form using the helper
    await fillForm('Fluffy', 'Susan', 'My beloved Monchhichi');
    
    // Submit form
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Fluffy',
        ownerName: 'Susan',
        description: 'My beloved Monchhichi',
        image: expect.any(String) // Base64 string
      });
    });
  });

  test('resets form after successful submission', async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    const monchhichiNameInput = screen.getByLabelText(/monchhichi name/i);
    const ownerNameInput = screen.getByLabelText(/your name/i);
    
    // Fill form using the helper
    await fillForm('Fluffy', 'Susan');
    
    // Submit
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(monchhichiNameInput).toHaveValue('');
      expect(ownerNameInput).toHaveValue('');
      expect(screen.getByText('Click to upload your Monchhichi photo')).toBeInTheDocument();
    });
  });

  test('handles submission loading state', async () => {
    // Mock a slow submission
    mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    // Fill form using the helper
    await fillForm('Fluffy', 'Susan');
    
    // Submit form
    fireEvent.submit(screen.getByRole('form'));
    
    // Check loading state
    await waitFor(() => {
      expect(screen.getByText('Adding to Collection...')).toBeInTheDocument();
    });
    
    const submitButton = screen.getByRole('button', { name: /adding to collection/i });
    expect(submitButton).toBeDisabled();
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText('Add to Collection')).toBeInTheDocument();
    });
  });

  test('handles upload area click to trigger file input', async () => {
    render(<UploadForm onSubmit={mockOnSubmit} />);
    
    // Mock the file input click
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, 'click');
    
    const uploadArea = screen.getByText('Click to upload your Monchhichi photo').closest('div');
    await userEvent.click(uploadArea!);
    
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
}); 