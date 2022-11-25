import LogIn from "../../layout/LogIn";
import styles from './style.module.scss';

function LoginPage() {
  return (
    <div className={styles.login_page}>
      <LogIn />
    </div>
  );
};

export default LoginPage;
