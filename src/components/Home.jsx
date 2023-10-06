import React, { useEffect, useState,useMemo } from "react";
// import SearchUser from './SearchUser'
import SidebarComponent from "./SidebarComponent";
import ChatSectionComponent from "./ChatSectionComponent";
import { useParams} from "react-router-dom";

const Home = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const end_point = "/activeRooms/";
  const fullUrl = base_url + end_point;

  console.log(fullUrl)

  // const location = useLocation()
  // const token = location.state.token;
  // console.log(token)

  const raw_token = localStorage.getItem("token");
  console.log(raw_token);

  

  const headers = useMemo(() => {
    const headers = {
      'Authorization': `Bearer ${raw_token}`, // Use 'Bearer' or the appropriate prefix if required
      'Content-Type': 'application/json', // Adjust the content type as needed
    };
    return headers
  }, [raw_token]);
  console.log(headers);

  const [resultData, setResultData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResultData(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setResultData(null);
      }
    };

    fetchData(); // Call the async function

  }, [fullUrl, headers]);


  console.log(resultData);

  const { room_id } = useParams();
  // console.log(room_id)

  const responseData = {
    message: "Active Rooms retrieved successfully",
    data: {
      receivers_name: {
        "[2, 3]": ["maaz_safdar", "ayesha farooq"],
      },
      group_name: {
        "[2, 3, 4, 5, 6, 7]": [
          "programming_room",
          "room2",
          "test_team",
          "new_room",
          "python_room",
          "test_room",
        ],
      },
      "active room": [
        {
          room_id: 1,
          room_name: "Room 1",
          timestamp: 1695629405,
          text: "Check if participant is appended",
        },
        {
          room_id: 2,
          room_name: "Room 2",
          timestamp: 1695796714,
          text: "Hello, Ayesha here ",
        },
        {
          room_id: 3,
          room_name: "Room 3",
          timestamp: 1696400970,
          text: "Maaz Safdar sent hello message",
        },
        {
          room_id: 4,
          room_name: "Room 4",
          timestamp: 1695377388,
          text: "looking for new participants",
        },
        {
          room_id: 5,
          room_name: "Room 5",
          timestamp: 1695629405,
          text: "Sample text for room 5",
        },
        {
          room_id: 6,
          room_name: "Room 6",
          timestamp: 1695796714,
          text: "Another message for room 6",
        },
        {
          room_id: 7,
          room_name: "Room 7",
          timestamp: 1696400970,
          text: "Message for room 7",
        },
        {
          room_id: 8,
          room_name: "Room 8",
          timestamp: 1695377388,
          text: "A different message for room 8",
        },
        {
          room_id: 9,
          room_name: "Room 9",
          timestamp: 1695629405,
          text: "Text for room 9",
        },
        {
          room_id: 10,
          room_name: "Room 10",
          timestamp: 1695796714,
          text: "Room 10 message",
        },
        {
          room_id: 11,
          room_name: "Room 11",
          timestamp: 1696400970,
          text: "Message for room 11",
        },
        {
          room_id: 12,
          room_name: "Room 12",
          timestamp: 1695377388,
          text: "Another message for room 12",
        },
        {
          room_id: 13,
          room_name: "Room 13",
          timestamp: 1695629405,
          text: "Text for room 13",
        },
        {
          room_id: 14,
          room_name: "Room 14",
          timestamp: 1695796714,
          text: "Room 14 message",
        },
        {
          room_id: 15,
          room_name: "Room 15",
          timestamp: 1696400970,
          text: "Message for room 15",
        },
      ],
    },
  };

  return (
    <div>
      <SidebarComponent responseData={responseData} />
      <ChatSectionComponent chat_id={room_id} />
      {/* <div>
        <h1>Chatty</h1>
      </div>
      <SearchUser/> */}
    </div>
  );
};

export default Home;
