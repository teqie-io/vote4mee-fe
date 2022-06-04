import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

const EmployeeCard = ({ name, role, content, skillList, socialList }) => {
    const theme = useTheme();

    const skillInfo = {
        python: {
            label: 'Python',
            icon: 'logos:python'
        },
        javascript: {
            label: 'JavaScript',
            icon: 'logos:javascript'
        },
        java: {
            label: 'Java',
            icon: 'logos:java'
        },
        typescript: {
            label: 'TypeScript',
            icon: 'logos:typescript-icon'
        },
        rust: {
            label: 'Rust',
            icon: 'logos:rust'
        },
        flask: {
            label: 'Flask',
            icon: 'logos:flask'
        },
        django: {
            label: 'Django',
            icon: 'logos:django-icon'
        },
        nestjs: {
            label: 'NestJs',
            icon: 'logos:nestjs'
        },
        react: {
            label: 'ReactJs',
            icon: 'logos:react'
        },
        vue: {
            label: 'VueJs',
            icon: 'logos:vue'
        },
        next: {
            label: 'NextJs',
            icon: 'logos:nextjs-icon'
        },
        spring: {
            label: 'Spring',
            icon: 'logos:spring-icon'
        },
        docker: {
            label: 'Docker',
            icon: 'logos:docker-icon'
        },
        kubernetes: {
            label: 'Kubernetes',
            icon: 'logos:kubernetes'
        },
        angular: {
            label: 'AngularJs',
            icon: 'logos:angular-icon'
        },
        aws: {
            label: 'AWS',
            icon: 'logos:aws'
        },
        gcp: {
            label: 'GCP',
            icon: 'logos:google-cloud'
        },
        azure: {
            label: 'Azure',
            icon: 'logos:microsoft-azure'
        },
        mysql: {
            label: 'MySQL',
            icon: 'logos:mysql-icon'
        },
        postgresql: {
            label: 'PostgreSQL',
            icon: 'logos:postgresql'
        },
        mongodb: {
            label: 'MongoDB',
            icon: 'logos:mongodb'
        }
    };
    const roleInfo = {
        tl: {
            role: 'Technical leader',
            color: '#0E1347'
        },
        swe: {
            role: 'Software Engineer',
            color: theme.palette.info.light
        }
    };

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
                image="/static/images/card/teqie-background.jpeg"
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
                <img alt="Cuong Hoang" src="/static/images/avatar/avatar-cuong-hoang.jpeg" className="avatar" />
                <Typography variant="h4" component="h1" fontWeight={600} my={2}>
                    {name}
                </Typography>

                <Typography variant="p" className="role" bgcolor={roleInfo[role].color}>
                    {roleInfo[role].role}
                </Typography>

                <Typography variant="p" my={4} textAlign="center" fontSize={18}>
                    {content}
                </Typography>

                <Box mb={1} textAlign="center">
                    {skillList.map((skill, index) => (
                        <Chip
                            key={index}
                            icon={<Box component={Icon} icon={skillInfo[skill].icon} sx={{ width: 16, height: 16 }} />}
                            label={skillInfo[skill].label}
                            sx={{ ml: 1, my: 1 }}
                        />
                    ))}
                </Box>

                <Box mb={2} width="400" display="flex" justifyContent="space-evenly">
                    <IconButton aria-label="github" sx={{ width: 80, height: 80 }}>
                        <Box component={Icon} icon="logos:github-icon" sx={{ width: 48, height: 48 }} />
                    </IconButton>
                    <IconButton aria-label="gitlab" sx={{ width: 80, height: 80 }}>
                        <Box component={Icon} icon="logos:gitlab" sx={{ width: 48, height: 48 }} />
                    </IconButton>
                    <IconButton aria-label="facebook" sx={{ width: 80, height: 80 }}>
                        <Box component={Icon} icon="logos:facebook" sx={{ width: 48, height: 48 }} />
                    </IconButton>
                    <IconButton aria-label="instagram" sx={{ width: 80, height: 80 }}>
                        <Box component={Icon} icon="logos:instagram-icon" sx={{ width: 48, height: 48 }} />
                    </IconButton>
                </Box>
                <Box width="300px" display="flex" justifyContent="space-between">
                    <Button variant="contained">Vote now</Button>
                    <Button>Or find out more!</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EmployeeCard;
