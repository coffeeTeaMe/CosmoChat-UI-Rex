import { useState, useEffect } from "react";
import "../../App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; //styling for components
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Button } from "@mui/material";
import api from "../../api/sessions";
import { useNavigate, useParams } from "react-router-dom";
import HomeStyles from "../../styles/home";


function Chat() {
  const API_KEY = '<API_KEY>';
  // get param from previous page.
  const { sessionId } = useParams();

  const [typing, setTyping] = useState(false);
  const navigate = useNavigate();
  const defaultMsg = {
    message:
      "Hello, I am ReX. What aspect of your career would you like guidance on?",
    sender: "ReX",
    direction: "incoming",
  };
  const [messages, setMessages] = useState([defaultMsg]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [lastId, setLastId] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async (id) => {
      console.log("sessionId" + id);
      try {
        if (id === null || id === undefined) {
          const response = await api.get("/sessions");
          const reversedSessions = response.data.reverse();
          setLastId(parseInt(reversedSessions[0].id) + 1);
        } else {
          const response = await api.get(`/sessions/${id}`);
          const session = response.data;
          setSession(session);
          setMessages(session.chats);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchSessions(sessionId);
  }, [sessionId]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    // update our messages state
    setMessages(newMessages);

    // set a typing indicator (chatbot is typing)
    setTyping(true);
    // process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  const handleSaveTheSession = async (id, isEnded) => {
    let newSession = {};

    // save a new session
    setTimeout(async function () {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = months[month] + " " + day + ", " + year;

      newSession = {
        id: String(id),
        date: formattedDate,
        chats: messages,
        isSessionEnded: isEnded,
      };

      console.log(newSession);

      try {
        if (sessionId === null || sessionId === undefined) {
          await api.post(`sessions`, newSession);
        } else {
          await api.put(`sessions/${sessionId}`, newSession);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }, 5000);
  };

  const handleEndConversation = async () => {
    const id = sessionId === undefined ? lastId : sessionId;
    try {
      handleSaveTheSession(id, true);
      // Redirect to the chat history page
      navigate("/chat-history");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSaveConversation = async () => {
    const id = sessionId === undefined ? lastId : sessionId;
    try {
      handleSaveTheSession(id, false);
      // Redirect to the chat history page
      navigate("/chat-history");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages { sender: "user" or "ChatGPT", message: "The message content here"}
    // apiMessages {role: "user" or "assistant", content: "The message content"}

    let apiMessages = chatMessages.map((messageObj) => {
      let role = "";
      if (messageObj.sender === "ReX") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObj.message };
    });

    // role: "user" -> a message from the user, "assistant" -> a response from chatGPT
    // "system" -> generally one initial message defining how we want chatgpt to talk

    const systemMessage = {
      role: "system",
      content:
        "Your name is Rex. You are a career advice assistant. You give advice to user about his/her career",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1,message2]
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ReX",
            direction: "incoming",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className="Chat">
      <div style={{ position: "relative", height: "660px", width: "370px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ReX is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            {session && session.isSessionEnded ? (
              <></>
            ) : (
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            )}
          </ChatContainer>
        </MainContainer>
      </div>

      {session && session.isSessionEnded ? (
        <></>
      ) : (
        <div
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveConversation}
            style={{...HomeStyles.button, ...HomeStyles.buttonWithMargin }}
            size="small"
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleEndConversation}
            style={HomeStyles.button}
          >
            End
          </Button>
        </div>
      )}
    </div>
  );
}

export default Chat;
