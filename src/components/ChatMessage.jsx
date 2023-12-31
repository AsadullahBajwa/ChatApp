import styled from "styled-components";
import jwtDecode from "jwt-decode";

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f0f0f0;
  margin: 5px;
  border-radius: 10px;
  min-width: 28%;
  max-width: 50%;
  // height: 75px;
`;

const MessageText = styled.p`
  font-size: 16px;
  margin: 0 0 10px;
`;

const SenderName = styled.p`
  font-size: 20px;
  color: #888;
  margin: 0 0 20px;
`;

const Timestamp = styled.p`
  font-size: 10px;
  color: #aaa;
  align-self: flex-end;
  margin: 0 0 10px;
`;

const DeleteIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  // Add styling for the icon as needed
`;

const ChatMessage = ({ message, sender, timestamp }) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  // console.log(token);

  const handleDeleteMessage = () => {
    alert("Delete message button clicked")
    // You can add your API call here to delete the message
    // Make the API call and handle the response as needed
  };

  // console.log("decoded username:",decodedToken.username)
  // console.log("sender:",sender)

  return (
    <ChatMessageContainer
      style={{
        alignSelf: sender === decodedToken.username ? "flex-end" : "flex-start",
        backgroundColor: "lightcyan",
      }}
    >
      <DeleteIcon onClick={handleDeleteMessage}>Delete</DeleteIcon>
      <SenderName>{sender}</SenderName>
      <MessageText>{message}</MessageText>
      <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
    </ChatMessageContainer>
  );
};

export default ChatMessage;

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}
