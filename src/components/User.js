import React from 'react'
import {useState,useEffect} from 'react'
import axios from '../api/axios'

const Users = () => {



    const [users,setUsers] = useState()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()        // it cancels request and we want to do that when the component unmounts so we want to be able to cancel any pending request that is still out there if the component unmounts

            const getUsers = async () => {
                    try{
                                const response = await axios.get('/users',{
                                    signal: controller.signal
                                });
                                console.log(response.data);
                                isMounted &&  setUsers(response.data)
                    } catch(err) {
                        console.error(err)
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