import React, { useEffect, useState } from 'react';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { utils, web3 } from '@project-serum/anchor';
import * as buffer from 'buffer';
import { useWalletKit, useSolana, useConnectedWallet } from '@gokiprotocol/walletkit';
import Carroussel from './components/Carroussel';
import EmployeeCard from './components/EmployeeCard';
import { getProgram } from './blockchain/connector';

const App = () => {
    const employees = [
        {
            name: 'Hoàng Văn Cường',
            role: 'tl',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'python',
                'javascript',
                'django',
                'nestjs',
                'flask',
                'react',
                'aws',
                'gcp',
                'azure',
                'docker',
                'kubernetes'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        },
        {
            name: 'Vũ Quang Huy',
            role: 'tl',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'python',
                'javascript',
                'java',
                'flask',
                'nestjs',
                'django',
                'react',
                'aws',
                'docker',
                'vue',
                'rust',
                'mongodb',
                'postgresql'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        },

        {
            name: 'Hoàng Văn Cường',
            role: 'tl',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'python',
                'javascript',
                'django',
                'nestjs',
                'flask',
                'react',
                'aws',
                'gcp',
                'azure',
                'docker',
                'kubernetes'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        },
        {
            name: 'Vũ Quang Huy',
            role: 'tl',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'python',
                'javascript',
                'java',
                'flask',
                'nestjs',
                'django',
                'react',
                'aws',
                'docker',
                'vue',
                'rust',
                'mongodb',
                'postgresql'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        },
        {
            name: 'Võ Minh Thiên Long',
            role: 'swe',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n' +
                '                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n' +
                '                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
                '                    cillum dolore eu fugiat nulla pariatur.',
            skillList: [
                'angular',
                'python',
                'javascript',
                'java',
                'spring',
                'nestjs',
                'flask',
                'react',
                'aws',
                'docker',
                'mongodb',
                'postgresql',
                'mysql'
            ]
        }
    ];
    const cards = employees.map(({ name, role, content, skillList }) => ({
        key: uuidv4(),
        content: <EmployeeCard name={name} role={role} content={content} skillList={skillList} />
    }));
    const wallet = useConnectedWallet();
    const [phantom, setPhantom] = useState(null);
    const { connect } = useWalletKit();

    useEffect(() => {
        if ('solana' in window) {
            setPhantom(window.solana);
        }
    }, []);

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        phantom?.on('connect', () => {
            setConnected(true);
        });

        phantom?.on('disconnect', () => {
            setConnected(false);
        });
    }, [phantom]);

    useEffect(() => {
        console.log(wallet);
    }, [wallet]);

    const connectHandler = async () => {
        await phantom?.connect();
        connect();
        console.log(wallet);
        console.log(phantom.publicKey.toString());
    };

    const disconnectHandler = () => {
        phantom?.disconnect();
    };

    const getAccount = async () => {
        phantom?.request({ method: 'connect' }).then((result) => console.log(result));
    };

    const createCandidate = async () => {
        const program = await getProgram(wallet);
        console.log(program);
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

    if (phantom) {
        if (connected) {
            return (
                <div className="App">
                    <Box>
                        <Button color="error" className="center-page" onClick={disconnectHandler}>
                            Disconnect from Phantom
                        </Button>
                        <Button color="secondary" className="center-page" onClick={getAccount}>
                            Get Phantom's account
                        </Button>
                        <Button color="secondary" className="center-page" onClick={createCandidate}>
                            Create candidate
                        </Button>
                    </Box>
                    <Carroussel cards={cards} height="100vh" width="80%" margin="0 auto" offset={1} showArrows />
                </div>
            );
        }

        return (
            <div className="App">
                <Button color="secondary" className="center-page" onClick={connectHandler}>
                    Connect to Phantom
                </Button>
            </div>
        );
    }

    return (
        <div className="App">
            <Button color="secondary" variant="contained" className="center-page">
                <Link href="https://phantom.app/" target="_blank">
                    Get Phantom
                </Link>
            </Button>
        </div>
    );
};

export default App;
