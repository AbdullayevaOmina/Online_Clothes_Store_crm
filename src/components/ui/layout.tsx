import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import routes from "../../router/routes";
// import Logo from "../../assets/logo.png";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "./header";
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Layout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const { pathname } = useLocation();
  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {routes?.map((item, index) => (
          <div key={index} className="m-3">
            <NavLink
              to={item.path}
              className={
                item.path === pathname
                  ? "block bg-blue text-white rounded-xl"
                  : ""
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <span
                      className={
                        item.path === pathname ? "text-white" : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                  </ListItemIcon>
                  <ListItemText primary={item?.content} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </div>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        isClosing={isClosing}
        setMobileOpen={() => setMobileOpen(!mobileOpen)}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <div className="h-[55px] w-full flex items-center justify-center">
            {/* <img src={Logo} alt="logo" className="w-16 h-16 p-2" /> */}
          </div>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <div className="h-[63px] w-full flex items-center justify-center">
            {/* <img src={Logo} alt="logo" className="w-16 h-16" /> */}
          </div>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
