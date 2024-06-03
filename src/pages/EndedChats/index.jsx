import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ReXMessage from "./../../components/ReXMessage";
import UserMessage from "./../../components/UserMessage";
import HomeStyles from "../../styles/home";

console.log("entered ended chat");
const EndedChat = ({ date, chats, handleDelete }) => {
  console.log("entered ended chat");
  return (
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h8" component="div">
          Chat Session on {date}
        </Typography>

        <div style={{ marginTop: "50px", marginBottom: "8px" }}>
          {chats.map((message, index) =>
            message.sender === "user" ? (
              <div key={index} style={{ marginBottom: "8px" }}>
                <UserMessage userMessage={message.message} />
              </div>
            ) : (
              <div key={index} style={{ marginBottom: "8px" }}>
                <ReXMessage rexMessage={message.message} />
              </div>
            )
          )}
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          style={HomeStyles.button}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default EndedChat;
