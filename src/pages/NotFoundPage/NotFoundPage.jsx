import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import Main from "../../components/Main/Main";
const NotFoundPage = () => {
  return (
    <Main className={styles.main}>
      <div className={styles.container}>
        <Link className={styles.homeLink} to="/">
          Go back
        </Link>
        <img
          className={styles.image}
          src="/images/404.jpg"
          alt="404 page not found"
        />
      </div>
    </Main>
  );
};

export default NotFoundPage;
