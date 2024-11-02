import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  text: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Renders a button component that can display text or a loading spinner based 
 * on the loading state.
 * @param loading - Indicates if the button is in a loading state.
 * @param onClick - The function to be executed when the button is clicked.
 * @param text - The text to be displayed on the button.
 * @param disabled - Indicates if the button is disabled.
 * @param sx - Custom styling for the button.
 * @param type - The type of the button.
 * @returns The loading button component.
 */
export default function LoadingButton({ loading, onClick, text, disabled=false, sx, type = 'button' }: LoadingButtonProps) {

  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      variant="contained"
      type={type}
      sx={{
        backgroundColor: '#f05a22',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d1491a',
        },
        position: 'relative',
        fontSize: '1em',
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: 'white', position: 'absolute' }} />
      ) : (
        <>
          {text}
        </>
      )}
    </Button>
  );
};