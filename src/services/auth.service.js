import axios from "axios";
const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
const BASE_API = dataBaseUrl+"api/";
class AuthService {  
  login(endUrl, email, password) {    
    return axios
      .post(BASE_API+endUrl, {
        'email':email,
        'password':password,
      })
      .then(response => {        
        if (response.data.token) {           
          localStorage.setItem("user", JSON.stringify(response.data));         
        }
        return response;
      });
  }
  logout() {
    localStorage.removeItem("user");   
  }
  register(url, formData) { 
    var finalData = {};
    formData.forEach(function(value, key){
      finalData[key] = value;
    });   
    return axios.post(
      BASE_API+url, 
      finalData,
    ).then(response => {  
      return response;
    }).catch(error => {    
      return error.response; 
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getCurrentUserWishlist() {
    return JSON.parse(localStorage.getItem('wishlist_items'));
  }
  postDataWithToken(url, formData, token) {   
    var finalData = {};   
    formData.forEach(function(value, key){
      finalData[key] = value;
    }); 
    return axios.post(
      BASE_API+url, 
      finalData,
      { headers: 
        {
          Accept : 'application/json',
          Authorization: 'Bearer ' + token 
        }
      }
    ).then(response => {
      return response;     
    }).catch(error => {      
      return error.response; 
    });
  }
}
export default new AuthService();