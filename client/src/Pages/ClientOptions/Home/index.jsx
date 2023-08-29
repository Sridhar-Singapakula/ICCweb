import React from 'react';
import styles from './styles.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector} from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.Home_container}>
      <div className={styles.card}>
        <div className={styles.card_child}>
        <i class="bi bi-currency-rupee" style={{color:"green"}}></i>
        <span style={{fontStyle:"normal"}}>{user && user.currentBalance}</span>
        </div>
        <div className={styles.card_body}>
          <h5 className={styles.head}>
           Credit Balance
          </h5>
        </div>
      </div>
      <div>
    </div>
    <div className={styles.card}>
        <div className={styles.card_child}>
        <i class="bi bi-bell" style={{color:"pink"}}></i>
        <span style={{fontStyle:"normal"}}></span>
        </div>
        <div className={styles.card_body}>
          <h5 className={styles.head}>
           Notifications
          </h5>
        </div>
      </div>
      <div>
    </div>
    </div>
    
  );
};

export default Home;
