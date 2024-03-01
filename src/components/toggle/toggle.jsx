import React, { useState } from 'react';
import styles from "@/ui/stats/table/list.module.css"

const ToggleDiv = () => {
  const [showDiv, setShowDiv] = useState(false);

  const toggleHandler = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div className={styles.toggle}>
      <button className={styles.button}onClick={toggleHandler}>{showDiv ? 'Send Link' : 'Send Link'}</button>
      {showDiv && ( 
        <div className={styles.send}>
          <br></br>
        <input placeholder="Enter link here.."></input>
        <button className={styles.button}>Send</button>
    </div>
      )}
      </div>
  );
};

export default ToggleDiv;
