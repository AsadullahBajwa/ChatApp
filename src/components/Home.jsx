import React, { useEffect, useState,useMemo } from "react";
// import SearchUser from './SearchUser'
import SidebarComponent from "./SidebarComponent";
import ChatSectionComponent from "./ChatSectionComponent";
import ChatSectionComponent2 from "./ChatSectionComponent2";
import { useParams} from "react-router-dom";
import TestSocket from "./TestSocket";
// import axios from "axios";

const Home = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const end_point = "/activeRooms/";
  const fullUrl = base_url + end_point;

  // console.log(fullUrl)

  // const location = useLocation()
  // const token = location.state.token;
  // console.log(token)

  // const raw_token = localStorage.getItem("token");
  // console.log(raw_token);

  

  // const headers = useMemo(() => {
  //   const headers = {
  //     'Authorization': `Bearer ${raw_token}`, // Use 'Bearer' or the appropriate prefix if required
  //     'Content-Type': 'application/json',
  //     // 'ngrok-skip-browser-warning': 'true' // Adjust the content type as needed
  //   };
  //   return headers
  // }, [raw_token]);
  // console.log(headers);

  // const [resultData, setResultData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Requesting");
  //       const response = await axios.get(fullUrl, {
  //         headers: headers
  //       });
  
  //       if (response.status !== 200) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const data = response.data;
  //       // console.log(data);
  //       setResultData(data);
  //     } catch (error) {
  //       console.error('Axios error:', error);
  //       console.log("NOW HERE");
  //       setResultData(null);
  //     }
  //   };
  
  //   // Check if the resultData is null before making the request
  //   if (resultData === null) {
  //     fetchData();
  //   }
  
  // }, [fullUrl,headers,resultData]);
  

  // useEffect(() => {
  //   fetch(fullUrl, {
  //     method: 'GET',
  //     headers:headers
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok"); // Corrected this line
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setResultData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //       setResultData(null);
  //     });
  // }, [fullUrl, headers]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(fullUrl, {
  //         method: 'GET',
  //         headers: headers,
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       setResultData(data);
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //       setResultData(null);
  //     }
  //   };

  //   fetchData(); // Call the async function

  // },[]);

  // import axios from 'axios';

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       console.log("Requesting")
//       const response = await axios.get(fullUrl, {
//         headers: headers
//       });

//       if (response.status !== 200) {
//         throw new Error('Network response was not ok');
//       }

//       const data =response.data;
//       // console.log(data)
//       setResultData(data);
//     } catch (error) {
//       console.error('Axios error:', error);
//       console.log("NOW HEREE")
//       setResultData(null);
//     }
//   };

//   fetchData(); // Call the async function

// }, [fullUrl,headers]);



  // console.log(resultData);

//   // Extract the relevant data from the response
  // const privateRooms = resultData['data']['private_room'];
  // console.log(privateRooms)
//   const groupRooms = resultData['data']['group_room'];
//   console.log(groupRooms)
//   const activeRooms = resultData.data["active room_with_latest_messages"];
//   console.log(activeRooms)

// // Combine data from private and group rooms
//   const combinedData = { ...privateRooms, ...groupRooms };
//   console.log(combinedData)

// // Create an array to store the results
// const resultData2 = [];

//   // Iterate through the combined rooms
//   for (const room_id in combinedData) {
//       const room_name = combinedData[room_id];

//       // Search for a matching room_id in activeRooms
//       const matchingRoom = activeRooms.find(room => room.room_id === parseInt(room_id));

//       if (matchingRoom) {
//           resultData2.push({
//               room_id: matchingRoom.room_id,
//               room_name: room_name,
//               timestamp: matchingRoom.timestamp,
//               last_message: matchingRoom.text
//           });
//       }
//   }

//   // Log the result data (you can use it for frontend display)
//   console.log(resultData2);

  const { room_id,room_name} = useParams();
  // console.log(room_id)

  
 

  return (
    <div>
      {/* <TestSocket/> */}
      <SidebarComponent/>
      <ChatSectionComponent2 chat_id={room_id} room_name={room_name}/>
      {/* <div>
        <h1>Chatty</h1>
      </div>
      <SearchUser/> */}
    </div>
  );
};

export default Home;
