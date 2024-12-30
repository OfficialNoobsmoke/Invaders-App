import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Optional if using React Router
import { Avatar, Menu, MenuItem } from '@mui/material';

interface INavBarProps {
  title: string;
  links: Array<{ label: string; path: string }>;
  menuItems: Array<{ id: number; label: string }>;
  onMenuItemClick?: (menuItem: { id: number; label: string }) => void;
  profileImageUrl: string | undefined;
}

const NavigationBarWrapper: React.FC<INavBarProps> = ({
  title,
  links,
  menuItems,
  onMenuItemClick,
  profileImageUrl,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (menuItem: { id: number; label: string }) => {
    if (onMenuItemClick) {
      onMenuItemClick(menuItem);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {links.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              component={Link}
              to={link.path} // If you're using React Router
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <Avatar
              alt="profile image"
              src={profileImageUrl}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {menuItems.map((menuItem) => (
              <MenuItem
                key={menuItem.id}
                onClick={() => handleMenuItemClick(menuItem)} // Pass the menu item when clicked
              >
                {menuItem.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBarWrapper;
