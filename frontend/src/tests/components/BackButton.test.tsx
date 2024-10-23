import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BackButton from '../../components/BackButton';

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

describe('BackButton', () => {
  it('renders as an active button by default', () => {
    // Render the default BackButton
    render(<BackButton />);

    const backButton = screen.getByRole('button');

    // Check if the button is in the document
    expect(backButton).toBeInTheDocument();

    // Check if the button is enabled (active by default)
    expect(backButton).toBeEnabled();
  });

  it('renders as a disabled button with props', () => {
    // Render the BackButton with the disabled prop set to true
    render(<BackButton disabled={true} />);

    const backButton = screen.getByRole('button');

    // Check if the button is in the document
    expect(backButton).toBeInTheDocument();

    // Check if the button is disabled
    expect(backButton).toBeDisabled();
  });

});
