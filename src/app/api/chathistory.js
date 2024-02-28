// app/api/chathistory.js
import axios from 'axios';

const retrieveChatHistory = async (userPhoneNumber, searchType) => {
  try {
    const response = await axios.get('https://rhd4lozcs6.execute-api.us-east-1.amazonaws.com/api/getChatHistory', {
      params: {
        phone_no: userPhoneNumber,
        prefix: searchType,
      },
      headers: {
        'prefix': 'bimakartbike',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error retrieving chat history: ${error.message}`);
  }
};

export default retrieveChatHistory;
