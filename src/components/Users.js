import React from 'react'
import {useState,useEffect} from 'react'
// import axios from '../api/axios'   after useAxiosPrivate hook we are not going to use this import in this component anymore 
import useAxiosPrivate from "../hooks/useAxiosPrivate"

//! what hapens if the refresh token has expired the one thats sored in the cookie well then ypu actually want the users to requthenticate  but you want to do it in the least annoying way possible they will get kicked back out to log back in but then you dont want them to just dump them off at the home page so we want to handle that with route r that we implemented with the protected routes ,so import couple of things from the react router 

import {useNavigate,useLocation} from "react-router-dom"

const Users = () => {



    const [users,setUsers] = useState()
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()        // it cancels request and we want to do that when the component unmounts so we want to be able to cancel any pending request that is still out there if the component unmounts

            const getUsers = async () => {
                    try{
                                const response = await axiosPrivate.get('/users',{
                                    signal: controller.signal
                                });
                                console.log(response.data);
                                isMounted &&  setUsers(response.data)
                    } catch(err) {
                        console.error(err)
                        navigate('/login',{state:{from:location},replace:true});  //this takes the location they are coming from ,say the admin component then they got set to the login but then tey are going to replace the login history back 

                        //!we are navigating back to the login page and then here we can set some state that will help us send the user where they were instead of getting dumped back  at just home page after a new login,sends them directly back to where they were 
                    }

            }
            getUsers()

            return() => {
                            isMounted = false;
                            controller.abort();
            }
    },[])
  return (
            <article>
                    <h2>Users List</h2>
                    {
                        users?.length
                        ?(
                            <ul>
                                {users.map((user,i) => <li key={i}>{user?.username}</li>)}
                            </ul>
                        ) : <p>
                            No users to display
                        </p>
                    }
                   
            </article>
  )
}

export default Users