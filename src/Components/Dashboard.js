import React,{useState, useEffect, useContext} from "react";
import TokenContext from "../context/TokenContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    let {token,setToken} = useContext(TokenContext)
    const [name,setName] = useState()
    const [zuku,setZuku] = useState()

    console.log("Token from context: ",token)

    const navigate = useNavigate();

    useEffect(() => {
         if(!token){
             setToken(localStorage.getItem("token"))
         }
    },[])
    

    useEffect(() => {
          if(token){
                axios.get("https://instagram-express-app.vercel.app/api/auth/zuku" , {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                })
                .then(response => {
                    setName(response.data.data.user.name)
                    setZuku(response.data.data.message)
                  }
                )
                .catch(err => {
                    console.log(err)
                })
          }
    },[token])


   async function kickOut(){
     try{
       const resposne =  await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout" , {
                headers:{
                    Authorization: `Bearer ${token}`
                }
           })
               localStorage.removeItem("token")
                setToken(null)
               console.log("Logout done")
               setName("")
                setZuku("")
               setTimeout(() => {
                   navigate("/login")
               }, 2000);

        }
        catch(err){
            console.log(err)
        }
    }

    // new Date()

    return(
        <div>
            <h2>Welcome, {name}</h2>
            <p>{zuku}</p>
            <button onClick={kickOut}>Logout</button>
        </div>
    )
}

export default Dashboard;