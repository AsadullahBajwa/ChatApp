import axios from "axios";
import React, { useEffect, useState, useMemo,useRef } from "react";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";
// import Jwt from 'jsonwebtoken';


const ChatSection = styled.div`
  width: 70%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: 321px;
  top: 10px;
  background-color: #f2dfbb;
  
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #075e54;
  padding: 10px;
  //   border: 1px solid black;
  // background-color: cyan;
`;

const ChatTitle = styled.h1`
  background-color: #4a340d,
  font-size: 20px;
  margin: 0;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #075e54;
  padding: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-self: flex-end;
`;

const SendButton = styled.button`
  background-color: #075e54;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  align-self: flex-end;
`;

const ChatMessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 80vh; /* Set a maximum height for the SidebarMenu */
  overflow-y: auto;
  flex: 1; /* Fill the remaining vertical space with chat messages */
  // max-width:0px;
`;




const ChatSectionComponent = ({ chat_id }) => {
  const raw_token = localStorage.getItem("token");
  const headers = useMemo(() => {
    const headers = {
      Authorization: `Bearer ${raw_token}`,
      "Content-Type": "application/json",
    };
    return headers;
  }, [raw_token]);


  // const tokenDecoded = Jwt.decode(raw_token) 

  // console.log(tokenDecoded.user_id)

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight, // Scroll to the bottom
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chat_id) {
      const fetchChat = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/msg/?room_id=${chat_id}`,
            {
              headers: headers,
            }
          );

          if (response.status !== 200) {
            throw new Error(
              "Network response was not ok in chatsection component"
            );
          }

          const data = response.data;
          setMessages(data.messages);
          setIsLoading(false);
        } catch (error) {
          console.error("Axios error in chatSection component:", error);
          setMessages([]);
          setIsLoading(false);
        }
      };

      fetchChat();
    }
    scrollToBottom();
  }, [chat_id, headers]);

  return (
    <ChatSection>
      <ChatHeader>
        <ChatTitle>{chat_id ? chat_id : "No room selected"}</ChatTitle>
      </ChatHeader>
      <ChatMessageList ref={chatContainerRef}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          messages.map((message, index) => (
            <div key={index}>
              <ChatMessage
          key={index}
          message={message.text}
          sender={message.sender}
          timestamp={message.timestamp}
        />
              {/* <ChatMessage />
              <ChatMessage>{message.text}</ChatMessage>
              <p>Sender: {message.sender}</p>
              <p>Timestamp: {message.timestamp}</p> */}
            </div>
          ))
        )}
      </ChatMessageList>
      <ChatInputWrapper>
        <ChatInput placeholder="Type a message..." />
        <SendButton>Send</SendButton>
      </ChatInputWrapper>
    </ChatSection>
  );
};

export default ChatSectionComponent;
