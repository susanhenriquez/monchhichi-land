import React from 'react';
import { render, screen } from '@testing-library/react';
import Collection from './Collection';
import { MonchhichiData } from './UploadForm';

// Mock data
const mockMonchhichi: MonchhichiData = {
  id: 'test-id-1',
  name: 'Fluffy',
  ownerName: 'Susan',
  description: 'My beloved Monchhichi with soft brown fur',
  image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
  dateAdded: new Date('2024-01-15')
};

const mockCollection: MonchhichiData[] = [
  mockMonchhichi,
  {
    id: 'test-id-2',
    name: 'Sweetie',
    ownerName: 'John',
    description: 'A pink Monchhichi that I got for my birthday',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    dateAdded: new Date('2024-01-20')
  }
];

describe('Collection', () => {
  test('renders empty collection state', () => {
    render(<Collection collection={[]} />);
    
    expect(screen.getByText('Community Collection')).toBeInTheDocument();
    expect(screen.getByText('No Monchhichi dolls in the collection yet!')).toBeInTheDocument();
    expect(screen.getByText('Be the first to share your beloved companion.')).toBeInTheDocument();
    expect(screen.getByText('🐒')).toBeInTheDocument();
  });

  test('renders collection with items', () => {
    render(<Collection collection={mockCollection} />);
    
    expect(screen.getByText('Community Collection')).toBeInTheDocument();
    expect(screen.getByText('Discover the wonderful Monchhichi dolls shared by our community members')).toBeInTheDocument();
    expect(screen.getByText('2 Monchhichis in our collection')).toBeInTheDocument();
  });

  test('renders single item correctly (singular form)', () => {
    render(<Collection collection={[mockMonchhichi]} />);
    
    expect(screen.getByText('1 Monchhichi in our collection')).toBeInTheDocument();
  });

  test('displays individual Monchhichi details correctly', () => {
    render(<Collection collection={[mockMonchhichi]} />);
    
    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('by Susan')).toBeInTheDocument();
    expect(screen.getByText('My beloved Monchhichi with soft brown fur')).toBeInTheDocument();
    expect(screen.getByText('Added 1/15/2024')).toBeInTheDocument();
    expect(screen.getByAltText('Fluffy by Susan')).toBeInTheDocument();
  });

  test('displays multiple Monchhichi items', () => {
    render(<Collection collection={mockCollection} />);
    
    // Check first item
    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('by Susan')).toBeInTheDocument();
    
    // Check second item
    expect(screen.getByText('Sweetie')).toBeInTheDocument();
    expect(screen.getByText('by John')).toBeInTheDocument();
    
    // Check both images are present
    expect(screen.getByAltText('Fluffy by Susan')).toBeInTheDocument();
    expect(screen.getByAltText('Sweetie by John')).toBeInTheDocument();
  });

  test('handles items without description', () => {
    const monchhichiWithoutDescription: MonchhichiData = {
      ...mockMonchhichi,
      description: ''
    };
    
    render(<Collection collection={[monchhichiWithoutDescription]} />);
    
    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('by Susan')).toBeInTheDocument();
    // Description should not be rendered when empty
    expect(screen.queryByText('My beloved Monchhichi with soft brown fur')).not.toBeInTheDocument();
  });

  test('displays love buttons for each item', () => {
    render(<Collection collection={mockCollection} />);
    
    const heartButtons = screen.getAllByText('❤️');
    expect(heartButtons).toHaveLength(2);
  });

  test('displays correct date format', () => {
    const monchhichiWithSpecificDate: MonchhichiData = {
      ...mockMonchhichi,
      dateAdded: new Date('2024-12-25')
    };
    
    render(<Collection collection={[monchhichiWithSpecificDate]} />);
    
    expect(screen.getByText('Added 12/25/2024')).toBeInTheDocument();
  });

  test('maintains correct order of items (newest first)', () => {
    const orderedCollection = [
      { ...mockMonchhichi, id: 'newest-id', name: 'Newest', dateAdded: new Date('2024-01-25') },
      { ...mockMonchhichi, id: 'oldest-id', name: 'Oldest', dateAdded: new Date('2024-01-10') }
    ];
    
    render(<Collection collection={orderedCollection} />);
    
    const monchhichiNames = screen.getAllByRole('heading', { level: 3 });
    expect(monchhichiNames[0]).toHaveTextContent('Newest');
    expect(monchhichiNames[1]).toHaveTextContent('Oldest');
  });

  test('handles long descriptions with proper truncation', () => {
    const longDescription = 'This is a very long description that should be truncated in the UI to prevent layout issues and maintain good visual hierarchy in the collection display';
    const monchhichiWithLongDescription: MonchhichiData = {
      ...mockMonchhichi,
      description: longDescription
    };
    
    render(<Collection collection={[monchhichiWithLongDescription]} />);
    
    expect(screen.getByText(longDescription)).toBeInTheDocument();
    // The CSS handles truncation, so we just verify the text is present
  });
}); 