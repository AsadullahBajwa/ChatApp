// import React,{useState} from 'react'
// import axios from 'axios'


// function SearchUser(){
//     const [email,setEmail]=useState('')
//     const [userExists,setUserExists]=useState(null)

//     const handleSearch = async () =>{
//         try{
//             const response= await axios.post('http://127.0.0.1:8000/search_user',{email});
//             setUserExists(response.data.user_exits);
//         }catch(error){
//             console.error('Error searching for user: ',error)
//         }
//     };

//     return(
//         <div>
//             <input type="text" placeholder='Enter email' value={email} name="" id="" onChange={(e)=>setEmail(e.target.value)} />
//             <button onClick={handleSearch}>Search</button>
//             {userExists!==null&&(<p>
//                 User with email {email} {userExists ? 'exits':'does not exist'}.
//             </p>)}
//         </div>
//     )
// }

// export default SearchUser

import React,{useState} from 'react'
import './css/sidebar.css'

function SearchUser(){
  const [email,setEmail]=useState('')
  const [userExists,setUserExists]=useState(null)

  const handleSearch = async () =>{
    try {
        const response = await fetch("http://127.0.0.1:8000/search_user", {
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

  return(
    <div className="search-bar">
  <input type="text" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
  <button onClick={handleSearch}>Search</button>
  <p>{userExists ? "User with email " + email + " exists." : "User does not exist."}</p>
</div>

  )
}

export default SearchUser
