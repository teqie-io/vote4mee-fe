import {
  Typography,
  Grid,
  Paper,
  TextField,
  Container,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useConnectedWallet } from '@gokiprotocol/walletkit';
import Box from '@mui/material/Box';
import * as solanaWeb3 from '@solana/web3.js';
import Page from '../components/Page';
import roleInfo from "../_mock/roleInfo";
import { getAuthState } from '../store/selectors';
import { fNumber } from '../utils/formatNumber';

const Profile = () => {
  const wallet = useConnectedWallet();
  const { auth } = useSelector((state) => getAuthState(state));

  return (
    <Page title="Profile">
      <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ display: "flex", flexDirection: "column", p: 4 }}>
                <Typography component="h2" variant="h4" mb={2}>
                  User information
                </Typography>
                <img src={auth?.photoURL} alt="avatar" width={200} height={200}
                     style={{ borderRadius: '50%', margin: "auto" }}/>
                <Typography align="center" sx={{ fontWeight: 600, fontSize: '1.2rem' }} mt={2}>
                  {auth?.name}
                </Typography>
                <Typography align="center" variant="subtitle1">
                  {auth?.roleId && roleInfo[auth?.roleId]?.name}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper sx={{ display: "flex", flexDirection: "column", p: 4 }}>
                <Typography mb={2} component="h2" variant="h4">
                  Detailed information
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                        id="id"
                        label="Wallet ID"
                        type="text"
                        value={wallet.publicKey}
                        fullWidth
                        variant="outlined"
                        disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                        id="id"
                        label="Balance"
                        type="text"
                        value={fNumber(auth?.balance)}
                        fullWidth
                        variant="outlined"
                        disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="name"
                        label="Name"
                        value={auth?.name}
                        fullWidth
                        variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Box display="flex" alignItems="center">
                        <strong>Project list:</strong>
                        {['Giiki', 'Sota', 'Vote4mee'].map((project, index) =>
                          <Typography variant="subtitle2" key={index} color="white" borderRadius="0.5em" sx={{ bgcolor: (theme) => theme.palette.info.main, p: 1, ml: 2 }}>{project}</Typography> )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                        id="contributions"
                        label="Contributions"
                        value={auth?.contributions || 0}
                        fullWidth
                        variant="outlined"
                        disabled
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
      </Container>
    </Page>)}

export default Profile;