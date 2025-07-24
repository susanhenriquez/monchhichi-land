import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders Monchhichi Land application', () => {
    render(<App />);
    
    // Check that the main sections are rendered
    expect(screen.getByText('Share Your Monchhichi')).toBeInTheDocument();
    expect(screen.getByText('Community Collection')).toBeInTheDocument();
    expect(screen.getByText('No Monchhichi dolls in the collection yet!')).toBeInTheDocument();
  });

  test('has proper layout structure', () => {
    render(<App />);
    
    const app = document.querySelector('.App');
    const landingPage = document.querySelector('.landing-page');
    const mainContent = document.querySelector('.main-content');
    
    expect(app).toBeInTheDocument();
    expect(landingPage).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
  });
}); 