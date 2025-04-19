import pageNotFound from "../../images/404.jpg";
import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Main className={styles.main}>
      <div className={styles.container}>
        <Link className={styles.homeLink} to="/">
          Go back
        </Link>
        <Image
          className={styles.image}
          src={pageNotFound}
          alt="404 page not found"
        />
      </div>
    </Main>
  );
};

export default NotFoundPage;
