import React from "react";
import { Grid, Typography } from "@mui/material";
import ChatStyles from "../../styles/chat";
import rexAvatar from "../../assets/rex-avatar.png";

const ReXMessage = ({ rexMessage }) => {
  return (
    <Grid container {...ChatStyles.rexMessageContainer}>
      <Grid item {...ChatStyles.rexMessageAvatarContainer}>
        <img src={rexAvatar} alt="Rex" {...ChatStyles.rexMessageAvatar} />
      </Grid>
      <Grid item {...ChatStyles.rexMessageTextContainer}>
        <Typography {...ChatStyles.rexMessageText}>{rexMessage}</Typography>
      </Grid>
    </Grid>
  );
};
export default ReXMessage;
