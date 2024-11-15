import { Box } from '@mui/material';
import PurchaseProductComponent from './PurchaseProductComponent';
import PurchaseNavBar from './PurchaseNavBar';

export default function PurchaseListComponent() {
  return (
    <Box
      sx={{
        backgroundColor: '#bdbcb9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <PurchaseNavBar />
      <Box
        sx={{
          backgroundColor: '#7a7a79',
          padding: '20px',
          width: '100%',
          maxWidth: '85%',
          minHeight: '100vh',
          margin: 'auto',
          display: 'flex',
          marginTop: '70px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#4f4f4d',
            width: '60%',
            minHeight: '100px',
            marginRight: '40px',
          }}
        >
          <PurchaseProductComponent />
        </Box>
        <Box
          sx={{
            backgroundColor: '#363632',
            width: '35%',
            padding: '20px',
          }}
        ></Box>
      </Box>
    </Box>
  );
}
