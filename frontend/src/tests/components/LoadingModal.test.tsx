import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; // For jest-dom matchers
import LoadingModal from '../../components/LoadingModel';

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

describe('LoadingModal', () => {
  it('renders the modal with CircularProgress when open is true', () => {
    render(<LoadingModal open={true} />);

    // Modal should be present
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument();

    // CircularProgress should be present inside the modal
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  it('does not render the modal or CircularProgress when open is false', () => {
    render(<LoadingModal open={false} />);

    // Modal and CircularProgress should not be present
    const modal = screen.queryByRole('presentation');
    expect(modal).not.toBeInTheDocument();

    const progress = screen.queryByRole('progressbar');
    expect(progress).not.toBeInTheDocument();
  });
});
