import axios from ('axios') ;
import dotenv from ('dotenv');
dotenv.config();

const url = 'process.env.MONGODB_URL';

 export const addUsers = (username, email, password) => {
  const payload = {
        username,
        email,
        password
  }
  axios.post(url, payload);
};
