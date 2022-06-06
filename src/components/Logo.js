import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
        <Box sx={{ ...sx }} display="flex" justifyContent="center" alignItems="center">
            <RouterLink to="/">
          <img src="/static/logo.jpg" alt="Teqie Logo" width={80} height={80} style={{ borderRadius: '0.75em' }}/>
            </RouterLink>
            <Box mx={2}>
                <Typography varaint="h3" component="h1" fontSize={20}>
                    Vote4mee
                </Typography>
                <Typography variant="subtitle2" fontSize={16}>
                    from Teqie
                </Typography>
            </Box>
        </Box>
  );
}
