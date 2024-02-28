// src/components/ToggleSwitch.jsx
"use client";
import React from 'react';
import styles from "@/ui/chat/chat.module.css";

import PropTypes from 'prop-types';


const ToggleSwitch = ({ isEnabled, toggleSwitch, className }) => {
  return (
    <label className={`${styles.toggleSwitch} ${className}`}>
      <input className={styles.checkbox} type="checkbox" checked={isEnabled} onChange={toggleSwitch} />
      <div className={styles.slider}></div>
    </label>
  );
};

ToggleSwitch.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  toggleSwitch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ToggleSwitch;

