import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.service.js'
import { logout } from '../../store/authSlice.js'

function LogoutBtn() {

    const dispatch = useDispatch();

    // Function to handle logout
    const logoutHandler  = () => {
        authService.logout()
        .then(() => {dispatch(logout())})
    }

  return (
    <button
        type="button"
        className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2"
        onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;