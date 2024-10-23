import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import DisplayFile from '../../components/DisplayFile';

describe('DisplayFile', () => {
  
  it('renders an empty Box when fileChosen is null', () => {
    const { container } = render(<DisplayFile fileChosen={null} />);
    
    // The Box is rendered, but nothing else
    const emptyBox = container.querySelector('.MuiBox-root');
    expect(emptyBox).toBeInTheDocument();
    expect(emptyBox).toBeEmptyDOMElement(); // Box should be empty when fileChosen is null
  });

  it('renders the file name and FilePresentIcon when fileChosen is not null', () => {
    const mockFile = new File([''], 'example.txt', { type: 'text/plain' });

    render(<DisplayFile fileChosen={mockFile} />);

    // Check that the file name is rendered
    const fileName = screen.getByText('example.txt');
    expect(fileName).toBeInTheDocument();

    // Check that the FilePresentIcon is rendered
    const fileIcon = screen.getByTestId('FilePresentIcon');
    expect(fileIcon).toBeInTheDocument();
  });
});
