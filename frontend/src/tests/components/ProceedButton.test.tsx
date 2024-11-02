import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ProceedButton from '../../components/ProceedButton';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

// Mock useNavigate to test navigation behavior
vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate only
  };
});

afterEach(() => {
  vi.clearAllMocks(); // Clear mocks after each test
});

describe('ProceedButton', () => {
  it('renders a disabled button when fileChosen is null', () => {
    render(
      <MemoryRouter>
        <ProceedButton fileChosen={null} />
      </MemoryRouter>
    );

    // Check that the button is disabled
    const button = screen.getByRole('button', { name: /proceed/i });
    expect(button).toBeDisabled();
  });

  it('renders an enabled button and triggers navigation when fileChosen is provided', async () => {
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProceedButton fileChosen={new File(["content"], "testFile.txt")} />
      </MemoryRouter>
    );

    // Check that the button is enabled
    const button = screen.getByRole('button', { name: /proceed/i });
    expect(button).toBeEnabled();

    // Simulate clicking the button
    await user.click(button);

    // Ensure that navigate is called with the correct route
    expect(navigateMock).toHaveBeenCalledWith('/seminfo/room');
  });
});
