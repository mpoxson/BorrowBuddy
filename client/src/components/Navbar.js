import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SettingsIcon from "@mui/icons-material/Settings";
import { COLORS, PAGE_NAMES, PAGE_ROUTES } from "../constants/enums";

const settings = PAGE_NAMES;

function Navbar({ onLogout }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu(); // Close the user menu
    onLogout(); // Trigger the logout function passed from the parent component
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <img
            src={require("../image/borrowbuddy_logo.png")}
            alt="BorrowBuddy logo"
            style={{ marginRight: "15px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={PAGE_ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              paddingLeft: "5px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: COLORS.SECONDARY,
            }}
          >
            BorrowBuddy
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={PAGE_ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BorrowBuddy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Typography
            component="a"
            href={PAGE_ROUTES.LOGIN}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "arial",
              fontWeight: 300,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              border: "2px solid white",
              padding: "5px 10px",
              borderRadius: "15px",
            }}
          >
            LogIn
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon color="accent" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.NAME} onClick={handleCloseUserMenu}>
                  <Typography
                    component="a"
                    href={setting.ROUTE}
                    textAlign="center"
                    color="primary"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {setting.NAME}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography
                  textAlign="center"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
