import React, { useEffect, useState, useMemo, useRef } from "react";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";
import jwtDecode from 'jwt-decode';


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
  list-style-type: none;
  padding: 0;
  max-height: 80vh;
  overflow-y: auto;
  flex: 1;
`;

// const ChatSectionComponent = ({ chat_id }) => {
//   const raw_token = localStorage.getItem("token");
//   const headers = useMemo(() => {
//     const headers = {
//       Authorization: `Bearer ${raw_token}`,
//       // "Content-Type": "application/json",
//     };
//     return headers;
//   }, [raw_token]);

//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatContainerRef = useRef(null);
//   const chatInputRef = useRef(null);

//   // Create a WebSocket reference
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // WebSocket URL based on chat_id
//     const wsUrl = `ws://localhost:8000/chat/${chat_id}/`;

//     // Initialize WebSocket connection
//     socketRef.current = new WebSocket(wsUrl,'chat')

//     console.log(raw_token)
//     // Handle WebSocket onopen event
//     socketRef.current.onopen = () => {
//       socketRef.current.send(JSON.stringify({token:raw_token}))
//       console.log("WebSocket connection is open");
//     };

//     // Handle WebSocket onmessage event
//     socketRef.current.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     };

//     // Handle WebSocket onclose event
//     socketRef.current.onclose = (event) => {
//       // console.log('Closed websoc',event.code)
//       // console.log('Reason',event.reason)
//       if (event.wasClean) {
//         console.log(
//           `WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`
//         );
//       } else {
//         console.error("WebSocket connection abruptly closed");
//       }
//     };

//     // Handle WebSocket error event
//     socketRef.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     return () => {
//       // Close the WebSocket connection when the component unmounts
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [chat_id,headers]);

//   const handleSend = () => {
//     const messageText = chatInputRef.current.value;

//     if (messageText) {
//       // Create a new message object
//       const newMessage = {
//         text: messageText,
//         sender: "You", // You can customize this as needed
//         timestamp: Date.now(), // Add a timestamp
//       };

//       // Send the message to the server via WebSocket
//       socketRef.current.send(JSON.stringify(newMessage));

//       // Update the local state to display the message
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       // Clear the input field
//       chatInputRef.current.value = "";

//       // Scroll to the new message
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   };

const ChatSectionComponent = ({ chat_id }) => {
  const raw_token = localStorage.getItem("token");
  const decodedToken = jwtDecode(raw_token)


  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  // Create a WebSocket reference
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket URL based on chat_id
    const wsUrl = `ws://localhost:8000/chat/${chat_id}/?${raw_token}`;

    // Initialize WebSocket connection
    socketRef.current = new WebSocket(wsUrl)

    // Handle WebSocket onopen event
    socketRef.current.onopen = () => {
      // Send the token as the first message to authenticate
      // socketRef.current.send(JSON.stringify({ token: raw_token }));
      console.log("WebSocket connection is open");
      setIsLoading(false)
    };


    // socketRef.current.addEventListener('message',(event)=>{
    //   if(event.data){
    //       console.log(event.data)
    //       const messageData = JSON.parse(event.data)
    //       console.log(messageData)
    //       if(messageData.payload === 'socket connected'){
    //         const chatHistory = messageData.chat_history || []
    //         // const messagesArray = chatHistory.map((message) => {
    //         //   const { text, sender, timestamp } = message;
    //         //   return { text, sender, timestamp };
    //         // });
    //         // console.log(chatHistory)
    //         setMessages(chatHistory)
    //         console.log(chatHistory)
    //         // setIsLoading(false)
    //         // console.log(messagesArray)
    //   }
    //   else{
    //     console.log('Data fro websocket is empty')
    //   }

    //   }
    // })

    // Handle WebSocket onmessage event
    // socketRef.current.onmessage = (event) => {
    //   const newMessage = JSON.parse(event.data);
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   chatContainerRef.current.scrollTo({
    //     top: chatContainerRef.current.scrollHeight,
    //     behavior: "smooth",
    //   });
    // };

    // Handle WebSocket onclose event
    
    socketRef.current.addEventListener('message', (event) => {
      if (event.data) {
        const messageData = JSON.parse(event.data);
        console.log(messageData)
    
        if (messageData.payload === 'socket connected') {
          const chatHistory = messageData.chat_history || {};
          const messages = chatHistory["0"] || [];
    
          const formattedMessages = messages.map((message) => ({
            text: message.text,
            sender: message.sender,
            timestamp: message.timestamp,
          }));

          console.log(formattedMessages)
    
          setMessages(formattedMessages);
        } else {
          console.log('Data from websocket is empty');
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

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [chat_id, raw_token]);

  const handleSend = () => {
    const messageText = chatInputRef.current.value;
  
    if (messageText) {
      const newMessage = {
        text: messageText, // Set the 'text' field with the message text
        sender: "You",
        timestamp: Date.now(),
      };
  
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
  };
  
  
  



  return (
    <ChatSection>
      <ChatHeader>
        <ChatTitle>{chat_id ? decodedToken.username || chat_id : "No room selected"}</ChatTitle>
      </ChatHeader>
      <ChatMessageList ref={chatContainerRef}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          messages.map((message,index) => (
            <ChatMessage
              key={index}
              message={message.text}
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
