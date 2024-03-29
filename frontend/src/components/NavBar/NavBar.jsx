import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Sidebar, Search } from "..";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = 240;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      const { name } = decodedToken;
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const ColorMode = useContext(ColorModeContext);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "80px",
            marginLeft: "240px",
            [theme.breakpoints.down("sm")]: {
              marginLeft: 0,
              flexWrap: "wrap",
            },
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                mr: theme.spacing(2),
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={ColorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {isAuthenticated ? (
              <Button
                color="inherit"
                component={Link}
                to={`/profile`}
                style={{
                  "&: hover": {
                    color: "white !important",
                    textDecoration: "none",
                  },
                }}
                onClick={() => {}}
              >
                {!isMobile && <> {userName} &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_1280.png&f=1&nofb=1&ipt=e85ff4c93f0b3b4793757e9c98fdaefce573311f0250dbd5fcef4db083261d6f&ipo=images"
                />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/login`}
                onClick={() => {}}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <Box
          component={"nav"}
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: { width: drawerWidth } }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: { width: drawerWidth } }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </div>
    </>
  );
};
export default NavBar;
