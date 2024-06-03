import React from "react";
import { Grid, Typography } from "@mui/material";
import ChatStyles from "../../styles/chat";
import userAvatar from "../../assets/user-avatar.png";

const UserMessage = ({ userMessage }) => {
  return (
    <Grid container {...ChatStyles.userMessageContainer}>
      <Grid item {...ChatStyles.userMessageTextContainer}>
        <Typography {...ChatStyles.userMessageText}>{userMessage}</Typography>
      </Grid>
      <Grid item {...ChatStyles.userMessageAvatarContainer}>
        <img src={userAvatar} alt="User" {...ChatStyles.rexMessageAvatar} />
      </Grid>
    </Grid>
  );
};
export default UserMessage;
