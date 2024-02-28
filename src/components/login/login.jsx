"use client";

//import { authenticate } from "@/app/lib/";
import styles from "@/ui/login/login.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  // const [state, formAction] = useFormState(authenticate, undefined);

  return (
    // <form action={formAction} className={styles.form}>
    <form className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <Link href="/dashboard">
        <button>Login</button>
      </Link>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
