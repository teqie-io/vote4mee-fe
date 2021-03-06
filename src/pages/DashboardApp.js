import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import {useSelector} from "react-redux";
import * as solanaWeb3 from "@solana/web3.js";
import {useEffect, useState} from "react";
import Page from '../components/Page';

import {
  AppCurrentVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { getAuthState, getEmployeesState } from '../store/selectors';
import roleInfo from '../_mock/roleInfo';
import { fNumber } from '../utils/formatNumber';

export default function DashboardApp() {
  const theme = useTheme();
  const { employees } = useSelector((state) => getEmployeesState(state));
  const { auth } = useSelector((state) => getAuthState(state));

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {auth?.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tokens used" total={(roleInfo[auth?.roleId]?.weight || 0) * 1e9} icon={'ant-design:dollar-circle-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Token left" total={auth?.balance || 0} color="info" icon={'ant-design:inbox-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Employees" total={employees.length} color="warning" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Roles" total={5} color="error" icon={'ant-design:project-outlined'} />
          </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                    title="My votes"
                    subheader={`used ${fNumber(123 + 456 + 789)} tokens out of ${fNumber(auth?.balance)} tokens`}
                    chartData={[
                        { label: 'Haris Nguyen', value: 123 },
                        { label: 'Quynh Nguyen', value: 456 },
                        { label: 'Hoang Van Cuong', value: 789 }
                    ]}
                />
            </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Token used"
              chartData={[
                { label: 'Used token', value: (auth?.weight * 1e9 - auth?.balance) || 0 },
                { label: 'Leftover token', value: auth?.balance || 0 }
              ]}
              chartColors={[
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0]
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
