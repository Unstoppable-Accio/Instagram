import React, {useState, useContext} from 'react';
import TokenContext from '../context/TokenContext';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import instaAuth from '../utilities/instaAuth';


const Login = () => {
   const [user,setUser] = useState({
         email:"", password:""
   })

   let [error,setError] = useState()
   let [success,setSuccess] = useState()

   let {token, setToken} = useContext(TokenContext)

   let {email,password} = user;

    const navigate = useNavigate();


   console.log("Token from context: ",token)

   function addUser(e){
         e.preventDefault();

         // validations: 

         if( !email || !password ){
            setError("Please fill all the details")
            setSuccess("")
            return
         }

         

        instaAuth.post("login", 
        {
         email, password
        }
        )
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            // localStorage.setItem("token",token)
            localStorage.setItem("token",response.data.data.token)
            setError("")
            setTimeout(() => {
            navigate("/dashboard") }, 2000);
        
        })
        .catch(err =>{
            setError(err.response.data.message)
            setSuccess("")
        })

            
          


         // api:
       
   }



    return(
        <div>
            {error && <h4 className="error">{error}</h4>}
            {
                success && <h4 className="success">{success}</h4>
            }
             <form className="login-form" onSubmit={addUser}>
               
                 <input type="email"  placeholder="Enter your email"
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}
                 />
                 <input type="password"  placeholder="Enter your password"
                    onChange={(e)=>{setUser({...user,password:e.target.value})}}
                 />
                
                 <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;




// axios.post(link , {} , {
//     headres: 

//     params:
// }
// )