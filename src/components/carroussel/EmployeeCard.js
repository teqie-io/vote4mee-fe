import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { utils, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { useConnectedWallet } from '@gokiprotocol/walletkit';
import roleInfo from "../../_mock/roleInfo";
import skillInfo from "../../_mock/skilInfo";
import {fNumber} from "../../utils/formatNumber";
import { getAuthState, getEmployeesState } from '../../store/selectors';
import { getProgram } from '../../blockchain/connector';

const EmployeeCard = ({ walletId, name, roleId, overview, photoURL, content, comments, skillList, socialList }) => {
    const { employees } = useSelector(state => getEmployeesState(state));
    const { auth } = useSelector(state => getAuthState(state));

    const wallet = useConnectedWallet();

    const [openVote, setOpenVote] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [tokens, setTokens] = useState(0);

    const handleVoteOpen = () => {
        setOpenVote(true);
    };

    const handleVoteClose = () => {
        setOpenVote(false);
    };

    const handleDetailOpen = () => {
        setOpenDetail(true);
    };

    const handleDetailClose = () => {
        setOpenDetail(false);
    };


    const voteCandidate = async ({ candidatePublicKey, amount }) => {
        const program = await getProgram(wallet);
        console.log(candidatePublicKey);
        const [candidateTreasurerPublicKey] = await web3.PublicKey.findProgramAddress(
          [Buffer.from('treasurer'), candidatePublicKey.toBuffer()],
          program.programId
        );
        const candidateTreasurer = candidateTreasurerPublicKey;

        const candidateTokenAccount = await utils.token.associatedAddress({
            mint: new web3.PublicKey('6sjwznizh5GL9nrSFmmnUAGwb3kAusXx7WCM4mRAPf6z'),
            owner: candidateTreasurer
        });

        const voterTokenAccount = await utils.token.associatedAddress({
            mint: new web3.PublicKey('6sjwznizh5GL9nrSFmmnUAGwb3kAusXx7WCM4mRAPf6z'),
            owner: wallet.publicKey
        });

        const [ballot] = await web3.PublicKey.findProgramAddress(
          [Buffer.from('ballot'), candidatePublicKey.toBuffer(), wallet.publicKey.toBuffer()],
          program.programId,
        )

        const programId = await program.rpc.vote(new anchor.BN(amount), {
            accounts: {
                admin: new anchor.web3.PublicKey('6JHnxvhDCTxxt4HQ8XonSwo7VZZ5KmUfZCitkg8unfkq'),
                authority: wallet.publicKey,
                candidate: candidatePublicKey,
                treasurer: candidateTreasurer,
                mint: new web3.PublicKey('6sjwznizh5GL9nrSFmmnUAGwb3kAusXx7WCM4mRAPf6z'),
                candidateTokenAccount,
                ballot,
                voterTokenAccount,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
            signers: [],
        });

        console.log(programId);
    }

    // console.log('Comments:', comments);
    return (
        <Card
            sx={{
                width: 700,
                borderRadius: '2em',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
            }}
        >
            <CardMedia
                component="img"
                height={250}
                image="/static/card/teqie-background.jpeg"
                alt="teqie background"
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 8
                }}
            >
                <Box height={200} width={200} sx={{ backgroundImage: `url(${photoURL})`, backgroundSize: 'cover'}} position="relative" top="-100px" marginBottom="-100px" borderRadius="50%" border="1em solid white" />
                <Typography variant="h4" component="h1" fontWeight={600} mb={2}>
                    {name}
                </Typography>

                 <Typography variant="p" borderRadius="0.5em" color="white" p={1} mb={2} bgcolor={roleInfo[roleId].color}>
                    {roleInfo[roleId].role}
                 </Typography>

                <Typography variant="p" mb={2} fontStyle="italic" fontWeight={600} textAlign="center">
                    {overview}
                </Typography>

                <Typography variant="p" mb={2} textAlign="center">
                    {walletId}
                </Typography>

                <Typography variant="p" mb={2} textAlign="center">
                    {content}
                </Typography>

                <Box mb={1} textAlign="center">
                    {skillList.filter((skill) => skill in skillInfo).map((skill, index) => (
                        <Chip
                            key={index}
                            icon={<Box component={Icon} icon={skillInfo[skill].icon} sx={{ width: 16, height: 16 }} />}
                            label={skillInfo[skill].label}
                            sx={{ ml: 1, my: 1 }}
                        />
                    ))}
                </Box>

                <Box mb={2} width="400" display="flex" justifyContent="space-evenly">
                    {(socialList.includes(0)) && <Link href="https://github.com/teqie-io">
                        <IconButton aria-label="github" sx={{ width: 80, height: 80 }}>
                            <Box component={Icon} icon="logos:github-icon" sx={{ width: 48, height: 48 }} />
                        </IconButton>
                    </Link>}
                    {(socialList.includes(1)) && <Link href="https://www.linkedin.com/company/teqieio">
                        <IconButton aria-label="gitlab" sx={{ width: 80, height: 80 }}>
                            <Box component={Icon} icon="logos:linkedin-icon" sx={{ width: 48, height: 48 }} />
                        </IconButton>
                    </Link>}
                    {(socialList.includes(2)) && <Link href="https://www.facebook.com/teqie.io">
                        <IconButton aria-label="facebook" sx={{ width: 80, height: 80 }}>
                            <Box component={Icon} icon="logos:facebook" sx={{ width: 48, height: 48 }} />
                        </IconButton>
                    </Link>}
                    {(socialList.includes(3)) && <Link href="https://www.instagram.com/teqie_vn/">
                        <IconButton aria-label="instagram" sx={{ width: 80, height: 80 }}>
                            <Box component={Icon} icon="logos:instagram-icon" sx={{ width: 48, height: 48 }} />
                        </IconButton>
                    </Link>}
                </Box>
                <Box width="300px" display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={handleVoteOpen}>Vote now</Button>
                    <Button onClick={handleDetailOpen}>Or find out more!</Button>
                </Box>

                <Dialog open={openVote} onClose={handleVoteClose}>
                    <DialogTitle>Vote for {name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Choose the amount of token you want to send to <strong>{name}</strong>. Please bear in that that this
                            action <strong>cannot be undo</strong>.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          variant="standard"
                          label="Token amount"
                          type="number"
                          fullWidth
                          value={tokens}
                          helperText={`out of ${fNumber(auth?.balance)} tokens left.`}
                          onChange={(event) => setTokens(event.target.value)}
                          InputLabelProps={{
                              shrink: true,
                          }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => voteCandidate({candidatePublicKey: new anchor.web3.PublicKey(walletId), amount: (tokens / 1e9)})} variant="contained">Vote</Button>
                        <Button onClick={handleVoteClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDetail} onClose={handleDetailClose}>
                    <DialogTitle><Typography variant="h4" fontWeight={700}>Comment for {name}
                </Typography></DialogTitle>
                    <DialogContent>
                        <Typography fontWeight={600}>Comments</Typography>
                        {comments.map((comment) => (
                          <Box border="1px solid grey" borderRadius="0.25em" p={2} mt={2} key={comment.id} width="550px">
                              <Typography variant="p" fontWeight={600}>
                                  {employees.filter(({ id }) => comment.senderId === id)[0].name}
                              </Typography>
                              <DialogContentText mt={1}>
                                  {comment.content}
                              </DialogContentText>
                          </Box>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleDetailClose();
                            handleVoteOpen();
                        }} variant="contained">Vote</Button>
                        <Button onClick={handleDetailClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default EmployeeCard;
