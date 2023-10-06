
import React, { useState } from 'react';
import styled from 'styled-components';

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
  flex: 1; /* Fill the remaining vertical space with chat messages */
`;

const ChatMessage = styled.li`
  padding: 10px;
//   background-color: #f0f0f0;
  margin: 10px;
  border-radius: 5px;
`;



const ChatSectionComponent = ({chat_id}) => {
  const [messages, setMessages] = useState([
    'Hello there!',
    'How are you?',
    'This is Chatty App'
    // Add more messages to the array
  ]);

  // console.log(chat_id);

  return (
    <ChatSection>
      <ChatHeader>
        <ChatTitle>{chat_id}</ChatTitle>
      </ChatHeader>
      <ChatMessageList>
        {messages.map((message, index) => (
          <ChatMessage key={index}>{message}</ChatMessage>
        ))}
      </ChatMessageList>
      <ChatInputWrapper>
        <ChatInput placeholder="Type a message..." />
        <SendButton>Send</SendButton>
      </ChatInputWrapper>
    </ChatSection>
  );
};

export default ChatSectionComponent;
