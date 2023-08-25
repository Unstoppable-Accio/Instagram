import React, {useState, useContext} from 'react';
import TokenContext from '../context/TokenContext';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import instaAuth from '../utilities/instaAuth';



const SignUp = () => {
   const [user,setUser] = useState({
         name:"", email:"", password:"", cpassword:""
   })

   let [error,setError] = useState()
   let [success,setSuccess] = useState()

   let {token, setToken} = useContext(TokenContext)

   let {name,email,password,cpassword} = user;

    const navigate = useNavigate();


   console.log("Token from context: ",token)

   function addUser(e){
         e.preventDefault();

         // validations: 

         if(!name || !email || !password || !cpassword){
            setError("Please fill all the details")
            setSuccess("")
            return
         }

         if(user.password !== user.cpassword){
            setError("Password and Confirm Password should be same")
            setSuccess("")
            return
        }

        // axios.post("https://instagram-express-app.vercel.app/api/auth/signup"
        

        instaAuth.post("/signup", 
        {
           name, email, password
        }
        )
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            setError("")
            // add to local storage:
              setTimeout(() => {
                navigate("/dashboard") }
                , 2000);
        
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
             <form className="signup-form" onSubmit={addUser}>
                 <input type="text"  placeholder="Enter your name"
                    onChange={(e)=>{setUser({...user,name:e.target.value})}}
                 />
                 <input type="email"  placeholder="Enter your email"
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}
                 />
                 <input type="password"  placeholder="Enter your password"
                    onChange={(e)=>{setUser({...user,password:e.target.value})}}
                 />
                 <input type="password"  placeholder="Confirm your password"
                    onChange={(e)=>{setUser({...user,cpassword:e.target.value})}}
                 />
                 <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default SignUp;




// axios.post(link , {} , {
//     headres: 

//     params:
// }
// )