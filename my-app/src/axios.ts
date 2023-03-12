import axios from "axios";
  const instance =axios.create({
    baseURL:"https://cors-anywhere.herokuapp.com/https://support.stream-labs.com/api",
  })
 
export default instance

export {}