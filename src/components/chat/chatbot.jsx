// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import styles from "@/ui/chat/chat.module.css";
// import ToggleSwitch from "@/components/chat/toggleswitch";
// import ChatMessage from "@/components/chat/chatmessage";
// import retrieveChatHistory from "@/app/api/chathistory";
// import { callApi } from "@/app/api/ai";
// import Image from 'next/image';

// function useChatScroll(dep) {
//   const ref = useRef();
//   useEffect(() => {
//     if (ref.current) {
//       ref.current.scrollTop = ref.current.scrollHeight;
//     }
//   }, [dep]);
//   return ref;
// }

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [isEnabled, setIsEnabled] = useState(true);
//   const [inputMessage, setInputMessage] = useState('');
//   const [searchType, setSearchType] = useState('bimakartbike');
//   const [userPhoneNumber, setUserPhoneNumber] = useState('');
//   const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
//   const [loading, setLoading] = useState(false); // State for loading spinner
//   const chatContainerRef = useChatScroll(messages);

//   const handleSearchTypeChange = (event) => {
//     setSearchType(event.target.value);
//     setInputMessage('');
//   };

//   const isValidPhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^\d{12}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   const toggleSwitch = () => {
//     setIsEnabled(!isEnabled);
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     if (!isValidPhoneNumber(userPhoneNumber)) {
//       alert('Please enter a valid phone number first.');
//       return;
//     }

//     const newUserMessage = { role: 'user', content: inputMessage };
//     setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//     setInputMessage('');
//     setLoading(true); // Start loading spinner

//     if (isEnabled) {
//       try {
//         const prefix = searchType;
//         const phoneNumber = userPhoneNumber;
//         const botReply = await callApi(inputMessage, prefix, phoneNumber);

//         const newBotMessage = { role: 'assistant', content: botReply };
//         setMessages((prevMessages) => [...prevMessages, newBotMessage]);
//       } catch (error) {
//         console.error('Error communicating with the API:', error);
//       } finally {
//         setLoading(false); // Stop loading spinner
//       }
//     } else {
//       const supportReply =
//         'Your message has been forwarded to our support team. They will get back to you soon.';
//       const newSupportMessage = { role: 'assistant', content: supportReply };
//       setMessages((prevMessages) => [...prevMessages, newSupportMessage]);
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       if (!isValidPhoneNumber(userPhoneNumber)) {
//         alert('Please enter a valid phone number first.');
//       } else {
//         sendMessage();
//       }
//     }
//   };
  
//   const retrieveChat = async () => {
//     try {
//       const chatHistory = await retrieveChatHistory(userPhoneNumber, searchType);
  
//       const messagesArray = Array.isArray(chatHistory.data)
//         ? chatHistory.data
//         : chatHistory.data?.messages || [];
  
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         ...messagesArray.map(({ role, content }) => ({ role, content })),
//       ]);
//     } catch (error) {
//       console.error('Error retrieving chat history:', error);
//     }
//   };

//   const handlePhoneNumberChange = (event) => {
//     setUserPhoneNumber(event.target.value);
//     setIsPhoneNumberEntered(!!event.target.value && isValidPhoneNumber(event.target.value));
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.topContainer}>
//         <div>
//           <label>Select Customer</label>
//           <select className={styles.dropdown} value={searchType} onChange={handleSearchTypeChange}>
          
//             <option value="bimakartbike">BIMAKARTBIKE</option>
            
//           </select>
//         </div>

//         <div className={styles.inputTopContainer}>
//           <input
//             type="text"
//             placeholder="Enter Number"
//             value={userPhoneNumber}
//             onChange={handlePhoneNumberChange}
//           />
//         </div>

//         <div>
//           <ToggleSwitch
//             className={styles.toggleSwitch}
//             isEnabled={isEnabled}
//             toggleSwitch={toggleSwitch}
//           />
//           <div className={styles.switchText}><span>{isEnabled ? 'AI Enabled' : 'AI Disabled'}</span></div>
           
//         </div>
        

//         <button className={styles.historyButton} onClick={retrieveChat}>
//           Chat history
//         </button>
//       </div>
      
//       <div className={styles.chatbotContainer} ref={chatContainerRef}>
      
//         <div className={styles.chatContainer}>
//           {messages.map((msg, index) => (
//             <ChatMessage
//               key={index}
//               role={msg.role}
//               content={msg.content}
//               className={msg.role === 'assistant' ? styles.botMessage : styles.userMessage}
//             />
//           ))}
//           {loading && <Image src="/Rolling.gif" width="50" height="50" alt="Loading..." />} 
//         </div>
        
//       </div>

      
//       <div className={styles.inputContainer}>
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress} 
//           />
//           <button onClick={sendMessage} disabled={!isPhoneNumberEntered}>
//             Send
//           </button>
//         </div>
//     </div>
//   );
// };

// export default Chatbot;

"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from "@/ui/chat/chat.module.css";
import ToggleSwitch from "@/components/chat/toggleswitch";
import ChatMessage from "@/components/chat/chatmessage";
import retrieveChatHistory from "@/app/api/chathistory";
import { callApi } from "@/app/api/ai";
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function useChatScroll(dep) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

const Chatbot = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownValue = 'bimakartbike';
  const phoneNumber = searchParams.get('phoneNumber') || '';
  const [messages, setMessages] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(!!phoneNumber);
  const [loading, setLoading] = useState(false);
  const [suggestionWindowVisible, setSuggestionWindowVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const chatContainerRef = useChatScroll(messages);
  const suggestionWindowRef = useRef();

  useEffect(() => {
    retrieveChat();
  }, [searchParams]); // Fetch chat history when search params change

  const handleSearchTypeChange = (event) => {
    // Not needed in this version as we directly get the dropdownValue from the URL
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{12}$/;
    return phoneRegex.test(phoneNumber);
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number first.');
      return;
    }

    const newUserMessage = { role: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setLoading(true);

    if (isEnabled) {
      try {
        const prefix = dropdownValue;
        const botReply = await callApi(inputMessage, prefix, phoneNumber);

        const newBotMessage = { role: 'assistant', content: botReply };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        setSuggestions([]); // Clear suggestions after receiving bot reply
      } catch (error) {
        console.error('Error communicating with the API:', error);
      } finally {
        setLoading(false);
      }
    } else {
      const supportReply = 'Your message has been forwarded to our support team. They will get back to you soon.';
      const newSupportMessage = { role: 'assistant', content: supportReply };
      setMessages((prevMessages) => [...prevMessages, newSupportMessage]);
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!isValidPhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number first.');
      } else {
        sendMessage();
      }
    }
  };

  const retrieveChat = async () => {
    try {
      const chatHistory = await retrieveChatHistory(phoneNumber, dropdownValue);

      const messagesArray = Array.isArray(chatHistory.data)
        ? chatHistory.data
        : chatHistory.data?.messages || [];

      setMessages((prevMessages) => [
        ...prevMessages,
        ...messagesArray.map(({ role, content }) => ({ role, content })).reverse(),
      ]);
    } catch (error) {
      console.error('Error retrieving chat history:', error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    setUserPhoneNumber(event.target.value);
    setIsPhoneNumberEntered(!!event.target.value && isValidPhoneNumber(event.target.value));
  };

  // const handleSuggestionWindowToggle = () => {
  //   setSuggestionWindowVisible(!suggestionWindowVisible);
  // };

  // const handleUseThisSuggestion = (suggestion) => {
  //   setInputMessage(suggestion);
  //   setSuggestionWindowVisible(false);
  // };

  // const handleRegenerateSuggestions = () => {
  //   // Your logic to regenerate suggestions goes here
  //   // For demonstration purposes, I'm just setting dummy suggestions
  //   const newSuggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
  //   setSuggestions(newSuggestions);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
      {/* <div className={styles.backButton}>
          <Link href="./stats">
          Back
          </Link>
        </div> */}
        <ToggleSwitch
          className={styles.toggleSwitch}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        />
        <div className={styles.switchText}><span>{isEnabled ? 'AI Enabled' : 'AI Disabled'}</span></div>
        
      </div>

      <div className={styles.chatbotContainer} ref={chatContainerRef}>
        <div className={styles.chatContainer}>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              content={msg.content}
              className={msg.role === 'assistant' ? styles.botMessage : styles.userMessage}
            />
          ))}
          {loading && <Image src="/Rolling.gif" width="50" height="50" alt="Loading..." />}
        </div>
      

      {/* <div className={styles.suggestionContainer}>
        <div className={styles.heading} >
          <h3>Agent Assist Mode</h3></div>
        <button className={styles.suggestionButtons} onClick={handleSuggestionWindowToggle}>
          {suggestionWindowVisible ? 'Hide Suggestions' : 'Show Suggestions'}
        </button>
        {suggestionWindowVisible && (
          <div className={styles.suggestionWindow} ref={suggestionWindowRef}>
            <div>
              <button  className={styles.suggestionButtons} onClick={handleRegenerateSuggestions}>Regenerate Suggestions</button>
            </div>
            <ul className={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleUseThisSuggestion(suggestion)}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={!isPhoneNumberEntered}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;







