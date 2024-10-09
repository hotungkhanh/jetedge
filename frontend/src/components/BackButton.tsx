import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

/**
 * React component for a back button with outlined style.
 * Displays a button with an arrow icon and text 'Back'.
 * @returns JSX element representing the back button
 */
export default function BackButton({ disabled=false } : {disabled?: boolean}) {
  return (
    <Button 
      variant='outlined' 
      startIcon={<ArrowBackIcon/>}
      disabled={disabled}
      sx={{
      color: 'white',
      borderColor: 'white',
      '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}>
      Back
    </Button>
  )
}