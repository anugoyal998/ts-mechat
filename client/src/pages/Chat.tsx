import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import Cookies from 'js-cookie'
import { IUserDetailsState } from '../types'

import { whoAmI as whoAmIApi } from '../api'

const Chat: React.FC = () => {

  const [userDetails, setUserDetails] = useState<IUserDetailsState>()

  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("accessToken") as string;
      try {
        const responses = await Promise.all([await whoAmIApi(accessToken)])
        setUserDetails(responses[0].data)
      } catch (err) {
        console.log(err)
      }
    })()
  },[])

  return (
    <div className="h-[500px] bg-mBlack-300 px-6">
      <div className="h-[20px]"></div>
      <Navbar userDetails={userDetails} />
    </div>
  )
}

export default Chat