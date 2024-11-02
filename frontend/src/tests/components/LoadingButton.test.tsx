import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LoadingButton from '../../components/LoadingButton';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

describe('LoadingButton', () => {

  it('shows a disabled button with CircularProgress and no text when loading is true', () => {
    render(
      <LoadingButton
        loading={true}
        onClick={() => {}}
        text="Submit"
      />
    );

    // Check that the button is disabled
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    // Check that CircularProgress is present
    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();

    // Check that the button does not display the text "Submit"
    expect(button).not.toHaveTextContent('Submit');
  });

  it('shows an enabled button with text and no CircularProgress when loading is false', () => {
    render(
      <LoadingButton
        loading={false}
        onClick={() => {}}
        text="Submit"
      />
    );

    // Check that the button is enabled
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();

    // Check that CircularProgress is not present
    const circularProgress = screen.queryByRole('progressbar');
    expect(circularProgress).not.toBeInTheDocument();

    // Check that the button displays the text "Submit"
    expect(button).toHaveTextContent('Submit');
  });

  it('triggers the onClick function when clicked and not loading', async () => {
    const handleClick = vi.fn();

    render(
      <LoadingButton
        loading={false}
        onClick={handleClick}
        text="Submit"
      />
    );

    // Simulate user clicking the button
    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    // Ensure the onClick function is called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});
