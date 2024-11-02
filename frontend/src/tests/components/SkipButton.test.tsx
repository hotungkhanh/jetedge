import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import SkipButton from '../../components/SkipButton';
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
    useNavigate: vi.fn(),
  };
});

describe('SkipButton', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
    sessionStorage.clear(); // Clear sessionStorage after each test
  });

  it('renders a disabled button when there are no solution in sessionStorage', () => {
    render(
      <MemoryRouter>
        <SkipButton />
      </MemoryRouter>
    );

    // Check that the button is disabled
    const button = screen.getByRole('button', { name: /modify timetable/i });
    expect(button).toBeDisabled();
  });

  it('renders an enabled button and triggers navigation when solution exists in sessionStorage', async () => {
    // Set sessionStorage value
    sessionStorage.setItem('campusSolutions', 'true');
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SkipButton />
      </MemoryRouter>
    );

    // Check that the button is enabled
    const button = screen.getByRole('button', { name: /modify timetable/i });
    expect(button).toBeEnabled();

    // Simulate clicking the button
    await user.click(button);

    // Ensure that navigate is called with the correct route
    expect(navigateMock).toHaveBeenCalledWith('/timetablemod');
  });
});
