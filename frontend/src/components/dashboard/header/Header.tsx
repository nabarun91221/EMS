import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import useUserStore from '@/store/useUserStore';
import useAlertStore from '@/store/useAlertStore';
import { useRouter } from 'next/navigation';
interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const { user, setUser } = useUserStore();
  const { setAlert } = useAlertStore();
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch("http://localhost:7777/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    if (res.ok) {
      const data = await res.json()
      setUser(null)
      setAlert({
        status: true,
        message: data.message,
        severity: "success",
      });
      router.push("/authentication/login")
    } else {
      const data = await res.json()
      setAlert({
        status: true,
        message: data.message,
        severity: "error",
      });
    }
  }

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {
            user == null ?
              <Button variant="contained" component={Link} href="/authentication/login" disableElevation color="primary" >
                Login
              </Button>
              :
              <Button variant="contained" onClick={handleClick} disableElevation color="primary" >
                logout
              </Button>
          }

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
