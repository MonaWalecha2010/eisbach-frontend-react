import axios from 'axios';
const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
const BASE_API = dataBaseUrl + "api/";
class ProductService {
  getAllData(url) {
    return axios
      .get(BASE_API + url).then((response) => {
        return response;
      }).catch((error) => {
        return error;
      });
  }
  postData(url, formData) {
    var finalData = {};
    formData.forEach(function (value, key) {
      finalData[key] = value;
    });
    return axios.post(
      BASE_API + url,
      finalData,
    ).then(response => {
      return response;
    }).catch(error => {
      if (error.response.status === 500) {
        Object.assign(error.response.data, { "success": false });
      }
      return error.response;
    });
  }
}
export default new ProductService();
