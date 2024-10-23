import { afterEach, describe, it, expect, vi, afterAll, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import UploadPopUp from '../../components/UploadPopUp';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

describe('UploadPopUp', () => {

  beforeAll(() => {
    globalThis.alert = vi.fn(); // Mock alert
  });

  afterAll(() => {
    vi.restoreAllMocks(); // Restore original alert after tests
  });


  it('renders the "Generate Timetable" button', () => {
    render(
      <MemoryRouter>
        <UploadPopUp />
      </MemoryRouter>
    );

    // Check if the button to open the modal is rendered
    const generateButton = screen.getByRole('button', { name: /generate timetable/i });
    expect(generateButton).toBeInTheDocument();
  });

  it('opens the modal when "Generate Timetable" button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <UploadPopUp />
      </MemoryRouter>
    );

    // Click the "Generate Timetable" button
    const generateButton = screen.getByRole('button', { name: /generate timetable/i });
    await user.click(generateButton);

    // Check if the modal elements are visible
    expect(screen.getByText(/upload file/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed/i })).toBeInTheDocument();
  });

  it('closes the modal when clicking outside', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <UploadPopUp />
      </MemoryRouter>
    );

    // Open the modal
    const generateButton = screen.getByRole('button', { name: /generate timetable/i });
    await user.click(generateButton);
  
    // Click outside the modal (backdrop)
    const backdrop = screen.getByText(/upload file/i).closest('.base-Modal-root')?.querySelector('.base-Backdrop-open');
    if (backdrop)
    {
      await user.click(backdrop);
    }
  
    // Ensure modal elements are no longer in the DOM
    expect(screen.queryByText(/upload file/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /proceed/i })).not.toBeInTheDocument();
  });

  it('renders disabled ProceedButton when no file is selected', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <UploadPopUp />
      </MemoryRouter>
    );

    // Open the modal
    const generateButton = screen.getByRole('button', { name: /generate timetable/i });
    await user.click(generateButton);

    // Ensure Proceed button is disabled initially
    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    expect(proceedButton).toBeDisabled();
  });

  it('does not enable ProceedButton when an invalid file is selected', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <UploadPopUp />
      </MemoryRouter>
    );

    // Open the modal
    const generateButton = screen.getByRole('button', { name: /generate timetable/i });
    await user.click(generateButton);

    // Simulate file selection
    const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
    const uploadButton = screen.getByText(/upload file/i); // Assuming the text is in UploadButton
    await user.upload(uploadButton, file);

    // Check that Proceed button is now enabled
    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    expect(proceedButton).not.toBeEnabled();
  });
});
