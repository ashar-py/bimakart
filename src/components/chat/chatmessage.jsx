
"use client";
import React from "react";
import styles from "@/ui/chat/chat.module.css";
import PropTypes from "prop-types";

const ChatMessage = ({ role, content, className }) => {
  const messageClass =
    role === "assistant" ? styles.botMessage : styles.userMessage;

  return (
    <div className={`${styles.chatMessage} ${messageClass} ${className}`}>
      <pre className={styles.pre}>
      <div className={styles.messageContent}>{content}</div>
      </pre>
    </div>
  );
};

ChatMessage.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ChatMessage;


