import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';

/**
 * Component for rendering a button with an arrow icon indicating next action.
 * @returns JSX element representing the NextButton component
 */
export default function NextButton({ disabled=false } : {disabled?: boolean}) {
  return (
    <Button 
      variant='outlined'
      endIcon={<ArrowForwardIcon/>}
      disabled={disabled}
      sx={{
      color: 'white',
      borderColor: 'white',
      '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}>
      Next
    </Button>
  )
}