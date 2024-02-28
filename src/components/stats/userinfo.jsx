"use client";
import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "@/app/api/userinfo";
import retrieveChatHistory from "@/app/api/chathistory";
import styles from "@/ui/stats/userinfo/userinfo.module.css";
import Image from "next/image";

const UserInfo = ({ phoneNumber }) => {
  const [userData, setUserData] = useState(null);
  const [chatHistory, setChatHistory] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingChatHistory, setLoadingChatHistory] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUserData(true);
        const userData = await fetchUserInfo(phoneNumber);
        setUserData(userData.data);
        setLoadingUserData(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoadingUserData(false);
      }
    };
    fetchData();
  }, [phoneNumber]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setLoadingChatHistory(true);
        const history = await retrieveChatHistory(phoneNumber, "bimakartbike");
        //console.log("History received", history);
        setChatHistory(history.data);
        setLoadingChatHistory(false);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setLoadingChatHistory(false);
      }
    };
    fetchChatHistory();
  }, [phoneNumber]);

  const handleChatHistoryClick = () => {
    setShowChatHistory(!showChatHistory);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>User Information</span>
      {loadingUserData ? <Image
            src="/Rolling.gif"
            width="60"
            height="60"
            alt="Loading.."
          />:<br></br>}
      {userData && (
        <div className={styles.userInfoContainer}>
          <div className={styles.tile}>
            <span>Customer Details</span>
            <div className={styles.content}>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone_no}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Postal Address:</strong> {userData.postal_address}
              </p>
            </div>
          </div>
          <div className={styles.tile}>
            <span>Call Summary</span>
            <div className={styles.content}>
              <p>{userData.threads.active_threads[0].summary}</p>
            </div>
          </div>
          <div className={styles.tile}>
            <span>Lead Quality</span>
            <div className={styles.content}>
              <p>
                <strong>Customer Sentiment:</strong>{" "}
                {userData.threads.active_threads[0].intent}
              </p>
              <p>
                <strong>Lead Quality:</strong>{" "}
                {userData.threads.active_threads[0].status}
              </p>
              <p>
                <strong>Recommended next steps:</strong>{" "}
                {userData.threads.active_threads[0].recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
      <br></br>
      <button onClick={handleChatHistoryClick} className={styles.toggleButton}>
        {loadingChatHistory ? (
          <p></p>
        ) : showChatHistory ? (
          "Hide Chat History"
        ) : (
          "Show Chat History"
        )}
      </button>
      {showChatHistory && chatHistory && (
        <div className={styles.chatHistory}>
          <h3>Chat History</h3>
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${
                item.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }`}
            >
              <p>
                <strong>{item.role}:</strong> {item.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
