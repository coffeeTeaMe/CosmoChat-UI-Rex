import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import EndedChat from "./../../pages/EndedChats";
import api from "../../api/sessions";
const ChatHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
        console.log("entered useEffect");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
      setLoading(false);
    };
    fetchSessions();
  }, []);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/sessions/${id}`);
      setSessions(sessions.filter((session) => session.id !== id));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <Grid container>
      {loading ? (
        <CircularProgress />
      ) : (
        sessions.map((session) => (
          <EndedChat
            key={session.id}
            date={session.date}
            chats={session.chats}
            handleDelete={() => handleDelete(session.id)}
          />
        ))
      )}
    </Grid>
  );
};
export default ChatHistory;
