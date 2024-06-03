import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import { Grid, Card, CardContent, CircularProgress, Typography, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import ActivityStyles from "../../styles/activity";
import HomeStyles from "../../styles/home";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const [loading, setLoading] = useState(true);
  const [sessionDates, setSessionDates] = useState([]);
  const [sessionChatLengths, setSessionChatLengths] = useState([]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        const reversedSessions = response.data.reverse();
        setSessions(reversedSessions);
        const sessionLengthsByDate = reversedSessions.reduce((acc, session) => {
          const { date } = session;

          if (!acc[date]) {
            acc[date] = 0;
          }

          acc[date] += 1;
          return acc;
        }, {});

        setSessionDates([...Object.keys(sessionLengthsByDate)]);
        setSessionChatLengths([...Object.values(sessionLengthsByDate)]);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err);
        }
      }
    };
    fetchSessions();
  }, []);

  const handleViewAll = () => {
    navigate("/chat-history");
  };

  return (
    <Grid container sx={ActivityStyles.activityBody}>
      <Grid container item sx={ActivityStyles.titleOutline}>
        <Typography sx={ActivityStyles.title}>Your Statistics</Typography>
      </Grid>
      <Grid container item>
        <Typography sx={ActivityStyles.description}>
          Graph of the conversation you had with ReX this year.
        </Typography>
      </Grid>
      <Grid container item>
        {loading ? (
          <CircularProgress />
        ) : (
          <BarChart
            xAxis={[{ scaleType: "band", data: sessionDates }]}
            series={[{ data: sessionChatLengths }]}
            width={500}
            height={300}
          />
        )}
      </Grid>
      <Grid
        container
        item
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: "16px" }}
      >
        <Typography sx={ActivityStyles.titleOutline}>
          Chat Activities
        </Typography>
        <Button variant="contained" size="small" onClick={handleViewAll} sx={HomeStyles.button}>
          View All
        </Button>
        </Grid>
        <Grid container direction="column" spacing={2} sx={HomeStyles.homePage}>
        {loading ? (
          <CircularProgress />
        ) : (
          sessions.map((session) => (
            <Grid item key={session.id} sx={HomeStyles.card}>
              <Card variant="outlined" sx={HomeStyles.smallCard}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={HomeStyles.sectionContent}>
                    {session.date}
                  </Typography>
                  <div style={HomeStyles.sectionDescription}>{session.chats.length} chats</div>
                </CardContent>
              </Card>
            </Grid>

          ))
        )}
      </Grid>
    </Grid>
  );
};
export default Activity;
