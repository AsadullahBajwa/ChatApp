import styled from 'styled-components';
import React,{useState,useMemo,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
// import { Jwt } from 'jsonwebtoken';


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



const SidebarComponent = () => {
  // console.log(responseData)

  const raw_token = localStorage.getItem("token");

  // const tokenDecoded = Jwt.decode(raw_token) 

  // console.log(tokenDecoded)
  // console.log(raw_token)

  const headers = useMemo(() => {
    const headers = {
      // "access-control-allow-origin" : "*",
      'Authorization': `Bearer ${raw_token}`, // Use 'Bearer' or the appropriate prefix if required
      'Content-Type': 'application/json',
      // 'ngrok-skip-browser-warning': 'true' // Adjust the content type as needed
    };
    return headers
  }, [raw_token]);

  const [resultData, setResultData] = useState(null);
  const [isLoading,setIsLoading]=useState(true)

  const url = 'http://localhost:8000/activeRooms/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Requesting");
        const response = await axios.get(url, {
          headers: headers
        });
  
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
  
        const data = response.data;
        // console.log(data);
        setResultData(data);
        if(data!=null){
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Axios error:', error);
        // console.log("NOW HERE");
        setResultData(null);
        // setIsLoading(false)
      }
    };
  
    // Check if the resultData is null before making the request
    if (resultData === null) {
      fetchData();
    }
  
  }, [url,headers,resultData]);

  // console.log(resultData)

  const resultData2 = [];
  if (!isLoading){
    // Extract the relevant data from the response
  const privateRooms = resultData['data']['private_room'];
  // console.log(privateRooms)
  const groupRooms = resultData['data']['group_room'];
  // console.log(groupRooms)
  const activeRooms = resultData.data["active room_with_latest_messages"];
  // console.log(activeRooms)

// Combine data from private and group rooms
  const combinedData = { ...privateRooms, ...groupRooms };
  // console.log(combinedData)

// Create an array to store the results


  // Iterate through the combined rooms
  for (const room_id in combinedData) {
      const room_name = combinedData[room_id];

      // Search for a matching room_id in activeRooms
      const matchingRoom = activeRooms.find(room => room.room_id === parseInt(room_id));

      if (matchingRoom) {
          resultData2.push({
              room_id: matchingRoom.room_id,
              room_name: room_name,
              timestamp: matchingRoom.timestamp,
              last_message: matchingRoom.text
          });
      }
  }

  // Log the result data (you can use it for frontend display)
  // console.log(resultData2);

  }

  

  const [search,setSearch]=useState('')
  const [userExists,setUserExists]=useState(null)
  const [flag,setFlag]=useState(false)

  const base_url = process.env.REACT_APP_BASE_URL
  const end_point = "/search_user";
  const fullUrl = base_url + end_point;


  // console.log(search)

  const handleSearch = async () =>{
    try {
      // console.log(search)
      const response = await axios.post(fullUrl,{search},{
        headers:headers
      });
      const data = response.data
      // console.log(data)
      setUserExists(data)
      setFlag(true)
      // console.log(userExists.Exist)
      // console.log(data.room_name)
    } catch (error){
      console.error('Error searching for user: ',error)
      setFlag(false)
    }

  };

  const handleCreateRoom = async ()=>{
    
  }
  // const activeRooms = responseData['data']['active_room'];
  const activeRooms = resultData2;

  if(isLoading){
    return <div>Loading..</div>
  }

  if (!activeRooms){
    return <div>No rooms exist for this user</div>
  }


  // let Id_name
  // if(userExists){
  //     Id_name = {
  //       user_id:userExists.user_id,
  //       user_name:userExists.user_name
  //     }
  //     console.log(Id_name)
  // }


  if(flag  && userExists.Exist){

    
    // console.log(userExists.Exist)
    return (
      <Sidebar>
      <SearchContainer>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..."></SearchBar>
        {/* <Link to={`/chat/${userExists.room_id}`}>
          {userExists.Exist ? (<ChatPreview><UserAvatar/><ChatInfo><UserName>{userExists.room_name}</UserName></ChatInfo></ChatPreview>):(<UserName>Room does not exist</UserName>)}</Link> */}
      </SearchContainer>
      <SidebarMenu>
          <Link
            to={`/chat/${userExists.room_id}`}
            style={{textDecoration:"none"}}
          >
            <ChatPreview>
              <UserAvatar />
              <ChatInfo>
                <UserName>{userExists.room_name}</UserName> {/* Replace with actual user names */}
              </ChatInfo>
            </ChatPreview>
            <Separator/>
          </Link>
        {/* ))} */}
        
        {/* Rest of your sidebar items */}
      </SidebarMenu>
    </Sidebar>
    )
  }
  else if(flag && userExists.Exist===false){
    return(
      <Sidebar>
      <SearchContainer>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..."></SearchBar>
        {/* <Link to={`/chat/${userExists.room_id}`}>
          {userExists.Exist ? (<ChatPreview><UserAvatar/><ChatInfo><UserName>{userExists.room_name}</UserName></ChatInfo></ChatPreview>):(<UserName>Room does not exist</UserName>)}</Link> */}
      </SearchContainer>
      <SidebarMenu>
          <Link
            to={`/chat/${search}`}
            style={{textDecoration:"none"}}
          >
            <ChatPreview>
              <UserAvatar />
              <ChatInfo>
                <UserName>{search}</UserName> {/* Replace with actual user names */}
                <LastMessage>Note: This Room Doesn't exists</LastMessage>
              </ChatInfo>
              <Timestamp><button onClick={handleCreateRoom}>Create</button></Timestamp>
            </ChatPreview>
            <Separator/>
          </Link>
      </SidebarMenu>
    </Sidebar>

    )
  }

  return (
    <Sidebar>
      <SearchContainer>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..."></SearchBar>
        {/* <Link to={`/chat/${userExists.room_id}`}>
          {userExists.Exist ? (<ChatPreview><UserAvatar/><ChatInfo><UserName>{userExists.room_name}</UserName></ChatInfo></ChatPreview>):(<UserName>Room does not exist</UserName>)}</Link> */}
      </SearchContainer>
      <SidebarMenu>
        {activeRooms.length === 0 ? (<div> No rooms exist for this user</div>): activeRooms.map((room) => (
          <Link
            to={`/chat/${room.room_id}`}
            key={room.room_id} style={{textDecoration:"none"}}
          >
            <ChatPreview>
              <UserAvatar />
              <ChatInfo>
                <UserName>{room.room_name}</UserName> {/* Replace with actual user names */}
                <LastMessage>{room.last_message}</LastMessage>
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