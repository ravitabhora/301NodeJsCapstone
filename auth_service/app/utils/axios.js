const axios = require('axios');

class Helper {

  static async makeRequestWithBodyOnly(url, data) {
    let details = {};
    await axios.post(url, data)
      .then(result => { details['data'] = result.data })
      .catch(error => {
        if (error.response) {
          console.log(error);
          details['error'] = error.response.data;
        } else if (error.request) {
          // The request was made but no response was received
          details['error'] = error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          details['error'] = error.message;
        }
      });
    return details;
  }

  static async makeRequestWithBodyPut(url, data) {
    let details = {};
    await axios.put(url, data)
      .then(result => { details['data'] = result.data })
      .catch(error => {
        if (error.response) {
          details = error.response.data;
        } else if (error.request) {
          // The request was made but no response was received
          details = error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          details = error.message;
        }
      });
    return details;
  }

  static async makeRequestWithParamAndBody(url, data) {
    let details = {};
    await axios.put(url, data)
      .then(result => { details['data'] = result.data })
      .catch(error => {
        if (error.response) {
          details['error'] = error.response.data;
          details['error']['status'] = error.response.status;
        } else if (error.request) {
          // The request was made but no response was received
          details['error'] = error.request;
          
        } else {
          // Something happened in setting up the request that triggered an Error
          details['error'] = error.message;
        }
      });
    return details;
  }

  // delete by id
  static async makeRequestToDelete(url) {
    let details = {};
    await axios.delete(url)
    .then(result => {  details = result.data })
    .catch(error => {
      if (error.response) {
        details['error'] = error.response.data;
        details['error']['status'] = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        details['error'] = error.request;
        
      } else {
        // Something happened in setting up the request that triggered an Error
        details['error'] = error.message;
      }
    });
    return details;
  }

  static async makeRequestToGetOne(url) {
    let details = {};
    await axios.get(url)
    .then(result => {  details = result.data })
    .catch(error => {
      if (error.response) {
        details['error'] = error.response.data;
        details['error']['status'] = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        details['error'] = error.request;
        
      } else {
        // Something happened in setting up the request that triggered an Error
        details['error'] = error.message;
      }
    });

    return details;
  }
}



module.exports = Helper;