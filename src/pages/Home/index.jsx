import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import api from "../../api/sessions";
import { useNavigate } from "react-router-dom";
import HomeStyles from "../../styles/home";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [endedChats, setEndedChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        const sessionsData = response.data.reverse(); // Assuming the most recent session should be first
        const activeSessions = sessionsData.filter(
          (session) => !session.isSessionEnded
        );
        const endedSessions = sessionsData
          .filter((session) => session.isSessionEnded)
          .slice(-3);
        setActiveChat(activeSessions.length ? activeSessions[0] : null);
        setEndedChats(endedSessions.length ? endedSessions : []);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
      setLoading(false);
    };
    fetchSessions();
  }, []);

  const handleViewAll = () => {
    navigate("/chat-history");
  };

  const handleNewConversation = () => {
    navigate("/chat");
  };

  const handleCardClick = (id) => {
    navigate(`/chat/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container justifyContent="center" style={{ padding: "20px" }}>
      <Grid item xs={12} md={10} lg={8} container spacing={2} direction="column" style={HomeStyles.homePage}>


        {/* Active Chat Section */}
        {activeChat && (
          <Grid item>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              style={HomeStyles.sectionTitle}
            >
              <Typography variant="h6">Active Chats</Typography>
            </Grid>
            <Card
              variant="outlined"
              style={HomeStyles.card}
              onClick={() => handleCardClick(activeChat.id)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={HomeStyles.sectionContent}
                >
                  {activeChat.date}
                </Typography>
                <div style={HomeStyles.chatContainer}>
                  {activeChat.chats.slice(-1).map(
                    (
                      message,
                      index // Display the most recent message
                    ) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="textSecondary"
                        style={{ marginBottom: "8px" }}
                      >
                        {message.sender === "user" ? "You: " : "ReX: "}
                        {message.message.length > 200
                          ? `${message.message.substring(0, 200)}...`
                          : message.message}
                      </Typography>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Ended Chats Section */}
        <Grid item>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={HomeStyles.sectionTitle}
          >
            <Typography variant="h6">Ended Chats</Typography>
            <Button
              variant="contained"
              onClick={handleViewAll}
              style={HomeStyles.button}
            >
              View All
            </Button>
          </Grid>
          {endedChats.map((session) => (
            <Card
              key={session.id}
              variant="outlined"
              style={HomeStyles.card}
              onClick={() => handleCardClick(session.id)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={HomeStyles.sectionContent}
                >
                  {session.date}
                </Typography>
                <div style={HomeStyles.chatContainer}>
                  {session.chats.slice(-1).map(
                    (
                      message,
                      index // Display the most recent message
                    ) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="textSecondary"
                        style={{ marginBottom: "8px" }}
                      >
                        {message.sender === "user" ? "You: " : "ReX: "}
                        {message.message.length > 200
                          ? `${message.message.substring(0, 200)}...`
                          : message.message}
                      </Typography>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid
          item style={{ margin: "0 auto", marginBottom: "20px" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNewConversation}
            style={HomeStyles.button}
          >
            Start a new conversation
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;