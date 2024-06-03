import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HomeIcon from '@mui/icons-material/Home';

const Navigation = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
          <Button
            color={location.pathname === "/home" ? "secondary" : "inherit"}
            component={Link}
            to="/home"
          >
          <HomeIcon />
        </Button>
        </Grid>
        <Grid item>
        <Button
          color={location.pathname === "/chat" ? "secondary" : "inherit"}
          component={Link}
          to="/chat"
        >
          <ChatBubbleIcon />
        </Button>
        <Button
          color={location.pathname === "/activities" ? "secondary" : "inherit"}
          component={Link}
          to="/activities"
        >
          <BarChartIcon />
        </Button>
        </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navigation;
