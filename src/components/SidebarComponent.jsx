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
  background-image: url("data:image/png;base64,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");
  background-size: cover;
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
            to={`/chat/${room.room_id}/${room.room_name}`}
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