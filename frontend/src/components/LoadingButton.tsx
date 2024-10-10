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