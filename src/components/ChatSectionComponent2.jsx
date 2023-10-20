import React, { useEffect, useState, useMemo, useRef } from "react";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

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
`;

const ChatTitle = styled.h1`
  font-size: 20px;
  margin: 0;
  color: white;
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
  cursor: pointer;
`;

const ChatMessageList = styled.ul`
  display:flex;
  flex-direction:column;
  list-style-type: none;
  padding: 0;
  max-height: 80vh;
  overflow-y: auto;
  flex: 1;
`;



const ChatSectionComponent = ({ chat_id,room_name }) => {
  const raw_token = localStorage.getItem("token");
  const decodedToken = jwtDecode(raw_token);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  // Create a WebSocket reference
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket URL based on chat_id
    const wsUrl = `ws://localhost:8000/chat/${chat_id}/?${raw_token}`;

    // const wsUrl = `ws://localhost:8000/ws/chat/${chat_id}/${room_name}/${decodedToken.id}/`;


    // Initialize WebSocket connection
    socketRef.current = new WebSocket(wsUrl);

    // Handle WebSocket onopen event
    socketRef.current.onopen = () => {
      // Send the token as the first message to authenticate
      // socketRef.current.send(JSON.stringify({ token: raw_token }));
      socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      
      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      // Scroll to the new message
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      console.log("WebSocket connection is open");
      setIsLoading(false);
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };


    socketRef.current.addEventListener("message", (event) => {
      if (event.data) {
        const messageData = JSON.parse(event.data);
        console.log(messageData);

        if (messageData.payload === "socket connected") {
          const chatHistory = messageData.chat_history || {};
          const messages = chatHistory["0"] || [];

          const formattedMessages = messages.map((message) => ({
            message: message.text,
            sender: message.sender,
            timestamp: message.timestamp,
          }));

          const revFormattedMessages=formattedMessages.slice().reverse()
          console.log(revFormattedMessages);

          setMessages(revFormattedMessages);
          
        } else {
          console.log("Data from websocket is empty");
        }
      }
    });

    socketRef.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("WebSocket connection abruptly closed");
      }
    };

    // Handle WebSocket error event
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    
    };
    

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [chat_id, raw_token]);

  const handleSend = () => {
    if (chatInputRef.current) {
      const messageText = chatInputRef.current.value;
      console.log(messageText);
      if (messageText) {
        const newMessage = {
          message: messageText,
          sender: decodedToken.username,
          timestamp: Date.now(),
        };

        console.log(newMessage);
        // Send the message to the server via WebSocket
        socketRef.current.send(JSON.stringify(newMessage));

        // Update the local state to display the message
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Clear the input field
        chatInputRef.current.value = "";

        // Scroll to the new message
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const location = useLocation()
  const user_details = location.state;
  // console.log(user_details)

  return (
    <ChatSection>
      <ChatHeader>
        <ChatTitle>
          {chat_id ? room_name || chat_id : "No room selected"}
        </ChatTitle>
      </ChatHeader>
      <ChatMessageList ref={chatContainerRef}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))
        )}
      </ChatMessageList>
      <ChatInputWrapper>
        <ChatInput
          ref={chatInputRef}
          placeholder="Type a message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </ChatInputWrapper>
    </ChatSection>
  );
};

export default ChatSectionComponent;
