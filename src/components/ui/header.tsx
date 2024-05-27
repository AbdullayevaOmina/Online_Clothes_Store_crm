import { IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./menu";
const drawerWidth = 240;
interface ModalProps {
  isClosing: boolean;
  setMobileOpen: () => void;
}
const Header = ({ isClosing, setMobileOpen }: ModalProps) => {
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen();
    }
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="w-full flex justify-between">
            <Typography variant="h6" noWrap component="div">
              Online Clothes Store
            </Typography>
            <Menu />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
