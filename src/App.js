import React, { useEffect } from 'react';
import Button from "@mui/material/Button";
import { Card, CircularProgress, Container, LinearProgress, Link, Paper, Typography } from '@mui/material';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import { useWalletKit, useConnectedWallet } from '@gokiprotocol/walletkit';
import { web3, utils } from '@project-serum/anchor';
import Page from "./components/Page";
import Logo from "./components/Logo";
import useResponsive from "./hooks/useResponsive";
import { connectWallet, me } from './store/reducers/authReducer';
import { getProgram } from './blockchain/connector';
import Router from './routes';
import { getEmployees } from './store/reducers/employeesReducer';
import { getAuthState, getEmployeesState } from './store/selectors';

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

const App = () => {
    const dispatch = useDispatch();
    const mdUp = useResponsive('up', 'md');
    const wallet = useConnectedWallet();
    const { connect } = useWalletKit();

    const { loading, auth } = useSelector(state => getAuthState(state));
    const { employees } = useSelector(state => getEmployeesState(state));

    useEffect(() => {if (wallet?.publicKey) dispatch(me({walletId: wallet.publicKey}))}, [wallet]);
    useEffect(() => {
        if (!employees.length) dispatch(getEmployees({}));
    }, []);

    const createCandidate = async () => {
        const program = await getProgram(wallet);
        const candidate = new web3.Keypair();

        const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
          [Buffer.from('treasurer'), candidate.publicKey.toBuffer()],
          program.programId
        );
        const treasurer = treasurerPublicKey;

        const candidateTokenAccount = await utils.token.associatedAddress({
            mint: new web3.PublicKey('6sjwznizh5GL9nrSFmmnUAGwb3kAusXx7WCM4mRAPf6z'),
            owner: treasurer
        });

        try {
            await program.rpc.initializeCandidate({
                accounts: {
                    authority: wallet.publicKey,
                    candidate: candidate.publicKey,
                    treasurer,
                    mint: new web3.PublicKey('6sjwznizh5GL9nrSFmmnUAGwb3kAusXx7WCM4mRAPf6z'),
                    candidateTokenAccount,
                    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
                    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
                    systemProgram: web3.SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY
                },
                signers: [candidate]
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (wallet && !loading && !auth?.name) return <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Paper sx={{ width: "550px", p: 4}}>
            <Typography color="error" variant="h3" textAlign="center">Connect wallet failed</Typography>
            <Box display="flex" justifyContent="center" my={5}>
                <img src="/static/icons/phantom-wallet.avif" alt="login" height={200} width={200}/>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="center" alignItems="center" mb={2}>
                <Typography variant="p" textAlign="center">You are not valid candidate!</Typography>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="center" alignItems="center">
                <Button variant="contained" onClick={ async () => {
                    connect();
                    await createCandidate();
                }}>
                    Connect to another wallet
                </Button>
            </Box>
        </Paper>
    </Box>;

    if (wallet?.connected) return <Router />;
    if (wallet && !wallet.connected) return (
        <Page title="Login">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/static/illustrations/illustration_login.png" alt="login" />
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Vote4mee
                        </Typography>

                        <Typography sx={{ color: 'text.secondary' }}>Connect to your Phantom wallet to continue.</Typography>

                        <Box display="flex" justifyContent="center" my={5}>
                            <img src="/static/icons/phantom-wallet.avif" alt="login" height={200} width={200}/>
                        </Box>
                        {!window.solana ?
                            <Button variant="contained" onClick={ async () => {
                                connect();
                                await createCandidate();
                            }}>
                                Connect to Phantom
                            </Button> :
                            <Link href="https://phantom.app/" target="_blank" sx={{ color: 'white' }}>
                                <Button variant="contained" fullWidth>
                                    Get Phantom
                                </Button>
                            </Link>
                        }
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );

    return <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>;
}

export default App;
