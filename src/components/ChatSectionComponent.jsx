
import axios from 'axios';
import React, { useEffect, useState,useMemo } from 'react';
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


  console.log(chat_id);

  const raw_token = localStorage.getItem("token");
  const headers = useMemo(() => {
    const headers = {
      'Authorization': `Bearer ${raw_token}`, // Use 'Bearer' or the appropriate prefix if required
      'Content-Type': 'application/json',
      // 'ngrok-skip-browser-warning': 'true' // Adjust the content type as needed
    };
    return headers
  }, [raw_token]);

  // console.log(raw_token)
  const [messages, setMessages] = useState(null)

  const url = 'http://fcd7-58-27-207-214.ngrok-free.app/'

  const [isLoading,setIsLoading]=useState(true)




  useEffect(()=>{
    const fetchChat = async ()=>{
      try{
        const response = await axios.get(url,{
          params: {
            room_id:chat_id
          },
          headers:headers
        })
  
        if (response.status!==200){
          throw new Error('Network response was not ok in chatsection component');
        }
  
        const data = response.data
        setMessages(data)
        if(data!==null){
          setIsLoading(false)
        }
      } catch (error){
        console.error('Axios error in chatSection component:', error);
        setMessages(null)
      }
      
    };

    if (messages==null){
      fetchChat()
    }
    

  },[chat_id,headers,messages])

  // console.log(messages)
  // console.log(chat_id);


  // if(isLoading){
  //   return (
  //     <div>Loading...</div>
  //   )
  // }

  // if(!chat_name){
  //   chat_name = null
  // }

  return (
    <ChatSection>
      <ChatHeader>
        <ChatTitle>{chat_id}</ChatTitle>
      </ChatHeader>
      <ChatMessageList>
        {isLoading ? (<div>Loading...</div>) : messages.map((message, index) => (
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
