import axios from "axios";


const  instaAuth = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api/auth",
    
})

export default instaAuth;