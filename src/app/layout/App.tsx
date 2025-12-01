import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { alpha, Box, CssBaseline, Stack } from '@mui/material'
import AppTheme from './shared-theme/AppTheme'
import SideMenu from '../shared/components/SideMenu'
import AppNavbar from '../shared/components/AppNavbar'
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../theme/customizations';
import Header from '../shared/components/Header'
import SignIn from '../../features/account/SignIn'
import { DashboardProvider } from '../shared/components/DashboardContext'


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props: { disableCustomTheme?: boolean }) {
  const location = useLocation();

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <ScrollRestoration />
      {location.pathname === "/" ? <SignIn /> : (
        <DashboardProvider>
          <>
            <Box sx={{ display: 'flex' }}>
              <SideMenu />
              <AppNavbar />
              <Box
                component="main"
                sx={(theme) => ({
                  flexGrow: 1,
                  backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                    : alpha(theme.palette.background.default, 1),
                  overflow: 'auto',
                })}
              >
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                  }}
                >
                  <Header />
                  <Outlet />
                </Stack>
              </Box>
            </Box>
          </>
        </DashboardProvider>
      )}
    </AppTheme>
  )
}

export default App
