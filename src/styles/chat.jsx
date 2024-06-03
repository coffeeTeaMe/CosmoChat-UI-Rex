const ChatStyles = {
  textDisplayBackground: {
    backgroundColor: "#F5F5F5",
    padding: "24px",
    borderRadius: "8px",
    marginTop: "24px",
    height: "calc(100vh - 120px)",
    overflowy: "auto",
  },
  textArea: {
    width: "100%",
    marginbottom: "16px",
  },
  endedChatContainer: {
    backgroundColor: "#F5F5F5",
    padding: "16px",
    borderRadius: "8px",
    marginbottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  endedChatDateContainer: {
    flex: "0 0 auto",
    marginRight: "16px",
  },
  endedChatDate: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
  },
  endedChatMessagesContainer: {
    flex: "1 1 auto",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  endedChatMessageContainer: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: "16px",
  },
  endedChatMessage: {
    padding: "8px 12px",
    borderRadius: "8px",
    marginRight: "8px",
  },
  endedChatUserMessage: {
    backgroundColor: "#E0E0E0",
    color: "#333",
  },
  endedChatRexMessage: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  endedChatButtonContainer: {
    flex: "0 0 auto",
  },
  endedChatButton: {
    backgroundColor: "#FF0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#CC0000",
    },
  },
  homeContainer: {
    padding: "40px",
    height: "100vh",
    overflowY: "auto",
  },
  rexMessageContainer: {
    display: "flex",
    // alignItems: "center",
    alignItems: "flex-start",
    marginbottom: "16px",
  },
  rexMessageAvatarContainer: {
    marginRight: "16px",
  },
  rexMessageAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  rexMessageTextContainer: {
    backgroundColor: "#F0F0F0",
    padding: "8px 16px",
    borderRadius: "16px",
    maxWidth: "70%", // Ensure the text container doesn't exceed 70% of the container width
    wordWrap: "break-word",
  },
  rexMessageText: {
    fontSize: "14px",
    lineHeight: "1.5",
  },
  userMessageAvatarContainer: {
    marginLeft: "16px",
  },
  userMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    marginbottom: "16px",
  },
  userMessageTextContainer: {
    backgroundColor: "#007BFF",
    padding: "8px 16px",
    borderRadius: "16px",
    maxWidth: "70%", // Ensure the text container doesn't exceed 70% of the container width
    wordWrap: "break-word", 
  },
  userMessageText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#fff",
  },
};
export default ChatStyles;
