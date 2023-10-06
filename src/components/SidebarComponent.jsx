import styled from 'styled-components';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #e0b463;
  position: fixed;
  left: 20px; /* Adjust the left margin as needed */
  // top: 10px;
  z-index: 10;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #075e54;
  padding: 5px;
  // border-radius: 5px;
  // margin: 10px;
`;

const SearchButton = styled.button`
  background-color: #e0b463; /* Button background color */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px; /* Adjust the right margin as needed */
  cursor: pointer;
`;

const SearchBar = styled.input`
  flex: 1;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 80vh; /* Set a maximum height for the SidebarMenu */
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
`;

const SidebarMenuItem = styled.li`
  cursor: pointer;
  padding: 10px;
`;


const ChatPreview = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgray; /* You can use actual avatars here */
  margin-right: 10px;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 19px;
  font-weight: bold;
  color: #4a340d;
`;

const LastMessage = styled.div`
  color: #756443;
  font-size: 14px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #888;
  text-align: right;
`;

const Separator = styled.div`
  border-top: 1px solid #4a340d; /* Adjust color and thickness as needed */
  // margin: 10px 0; /* Add margin as needed */
`;



const SidebarComponent = ({ responseData }) => {

  const [email,setEmail]=useState('')
  const [userExists,setUserExists]=useState(null)

  const base_url = process.env.REACT_APP_BASE_URL
  const end_point = "/search_user";
  const fullUrl = base_url + end_point;

  const handleSearch = async () =>{
    try {
        const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email})
        });
        const data = await response.json();
        setUserExists(data.user_exits);
      } catch (error) {
        console.error('Error searching for user: ', error);
        setUserExists(null);
      }

  };

  const activeRooms = responseData.data['active room'];


  return (
    <Sidebar>
      <SearchContainer>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <SearchBar value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Search contacts..."></SearchBar>
      </SearchContainer>
      <SidebarMenu>
      <Separator/>
        {activeRooms.map((room) => (
          <Link
            to={`/chat/${room.room_id}`}
            key={room.room_id} style={{textDecoration:"none"}}
          >
            <ChatPreview>
              <UserAvatar />
              <ChatInfo>
                <UserName>{room.room_name}</UserName> {/* Replace with actual user names */}
                <LastMessage>{room.text}</LastMessage>
              </ChatInfo>
              <Timestamp>{formatTimestamp(room.timestamp)}</Timestamp>
            </ChatPreview>
            <Separator/>
          </Link>
        ))}
        
        {/* Rest of your sidebar items */}
      </SidebarMenu>
    </Sidebar>
  );
};

export default SidebarComponent;


function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}