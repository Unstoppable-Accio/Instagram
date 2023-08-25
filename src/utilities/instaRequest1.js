import axios from "axios";


const  instaRequest1 = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api/auth",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
})

export default instaAuth;