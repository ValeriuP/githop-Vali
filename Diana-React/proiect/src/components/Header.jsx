// Importam librarii necesare pentru functionalitati React si Material-UI
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut, doSignInWithEmailAndPassword } from "../../auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import './Header.css';

// Definim componenta Header
function Header() {
  // Utilizam hook-uri pentru navigare, locatie si starea utilizatorului
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userLoggedIn } = useAuth();
  const { isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Efect pentru logarea locatiei curente
  useEffect(() => {
    // console.log(location);
  }, [location]);

  // Functie pentru a schimba starea drawer-ului mobil
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Definim link-urile pentru navigare
  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Profilul meu", path: "/my-profiles" },
    { text: "Cercei Mici", path: "/cercei-mici" },
    { text: "Cercei Mari", path: "/cercei-mari" },
    { text: "Coliere", path: "/colier" },
    { text: "Bratari", path: "/bratari" },
  ];

  // Adaugam link-uri suplimentare daca utilizatorul este admin
  if (isAdmin) {
    navLinks.push(
      { text: "All Users", path: "/all-users" },
      { text: "Adauga produse", path: "/add-products" },
      { text: "Messages", path: "/messages" },
      { text: "Modificare produs", path: "/modificare-produs" }
    );
  }

  // Renderizarea componentei
  return (
    <>
      {/* Bara de navigare */}
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ color: "#dcdcdc", marginLeft: 1 }}>
              Bijuteri Lucrate Manual
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  color: "#dcdcdc",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#dcdcdc",
                  },
                }}
              >
                {link.text}
              </Button>
            ))}
            <Button
              onClick={() => {
                if (userLoggedIn) {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                } else {
                  navigate("/login");
                }
              }}
              sx={{
                backgroundColor: userLoggedIn ? "#9e1b32" : "black",
                color: "#dcdcdc",
                "&:hover": {
                  backgroundColor: "#6d1b1b",
                  color: "#dcdcdc",
                },
              }}
            >
              {userLoggedIn ? "Logout" : "Login"}
            </Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: "#dcdcdc" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer pentru mobil */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250, backgroundColor: "black", height: "100%", color: "#dcdcdc" }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
            <Typography variant="h6">FlatFinder</Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "#dcdcdc" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link, index) => (
              <ListItem button key={index} component={Link} to={link.path}>
                <ListItemText primary={link.text} sx={{ color: "#dcdcdc" }} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => {
                if (userLoggedIn) {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <ListItemText primary={userLoggedIn ? "Logout" : "Login"} sx={{ color: "#dcdcdc" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

// Exportam componenta Header
export default Header;
