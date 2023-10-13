import React from 'react'
import jwtDecode from 'jwt-decode';


// import React from 'react'

const TestSocket = () => {


    const token = localStorage.getItem('token')
    console.log(token)

    const decodedToken = jwtDecode(token)
    console.log(decodedToken)

  return (
    <div>TestSocket</div>
  )
}

export default TestSocket