import axios from 'axios';

// make API request using axios, take response from server
// and return user and AUTH token
export default {
  user: {
    login: (credentials) =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user)
  }
}
