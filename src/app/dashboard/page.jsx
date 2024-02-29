"use client";

import React from "react";
import styles from "@/ui/stats/stats.module.css";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className={styles.container}>
       <span>ThirdParty Users</span>
      <div className={styles.thirdparty}>
       
      <div className={styles.tile}>
        <Link href="./dashboard/stats/active">Active Users</Link>
      </div>
      
      <div className={styles.tile}>
        <Link href="./dashboard/stats/doc_pending">Documents Pending</Link>
      </div>

      <div className={styles.tile}>
        <Link href="./dashboard/stats/payment_link_pending">Payment Link Pending</Link>
      </div>

      <div className={styles.tile}>
        <Link href="./dashboard/stats/payment_due">Payment Due</Link>
      </div>

      <div className={styles.tile}>
        <Link href="./dashboard/stats/completed">Completed</Link>
      </div>
      </div>

      <span>Comprehensive Users</span>
      <div className={styles.comprehensive}>     
      <div className={styles.tile}>
        <Link href="./stats/comprehensive">Comprehensive</Link>
      </div>
      </div>

      <span>Not Intrested Users</span>
      <div className={styles.notIntrested}>
      <div className={styles.tile}>
        <Link href="./stats/not_interested">Not Interested</Link>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
