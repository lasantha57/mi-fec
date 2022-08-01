import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  {
    id: 1,
    title: 'Home',
    route: '/'
  },
  {
    id: 2,
    title: 'About us',
    route: '/about-us'
  },
  {
    id: 3,
    title: 'FAQ',
    route: '/faq'
  }
];

const styles = {
  backgroundBlack: {
    backgroundColor: 'var(--bg-black)'
  },
  title: {
    mr: 2,
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  xs: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' }
  },
  md: {
    display: { xs: 'none', md: 'flex' }
  }
}

export const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (route: string) => {
    setAnchorElNav(null);
    navigate(route);
  };

  return (
    <AppBar position="static" sx={styles.backgroundBlack} component="header">
      <Container disableGutters maxWidth={false}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{...styles.title, ...styles.md}}
          >
            VIDEOS
          </Typography>

          <Box sx={styles.xs}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={() => handleCloseNavMenu(page.route)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{...styles.title, ...styles.xs}}
          >
            VIDEOS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handleCloseNavMenu(page.route)}
                sx={{ my: 2, color: 'var(--bg-white)', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Button
            component={RouterLink}
            to="/video"
            variant="contained"
            size="medium"
            color="success">
            Add Video
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};