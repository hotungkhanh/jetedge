import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';

export default function NextButton() {
  return (
    <Button 
      variant='outlined' 
      endIcon={<ArrowForwardIcon/>}
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