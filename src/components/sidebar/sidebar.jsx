import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { RiDashboardLine, RiSettingsLine, RiUserLine } from 'react-icons/ri';
import Link from 'next/link';
import styles from "@/ui/sidebar/sidebar.module.css";
import Image from 'next/image';

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.toggle} onClick={toggleSidebar}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <div className={styles.user}>
        <Image src="/noavatar.png" width="50" height="50" alt="User Avatar" className={styles.avatar} />
        <div className={styles.userInfo}>
          {/* <h3>{user.name}</h3>
          <span>{user.role}</span> */}
          <h3>Trini AI</h3>
          <span>Admin</span>
        </div>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href="/dashboard" passHref>
              <div className={styles.menuItem}>
                <RiDashboardLine />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/livechat" passHref>
              <div className={styles.menuItem}>
                <RiSettingsLine />
                <span>Live Chat</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <div className={styles.menuItem}>
                <RiUserLine />
                <span>Logout</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
