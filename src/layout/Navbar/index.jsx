import styles from './style.module.scss'
import ProfileIcon from '../../components/ProfileIcon';
import { useSelector } from 'react-redux';

function Navbar() {
    const userInfo = useSelector(store => store.userInfo);

    return (
        <div className={styles.navbar}>
            {userInfo && <ProfileIcon name={userInfo.name} userName={userInfo.userName} />}
            <div className={styles.navbar_title}>سامانه نوآپی</div>
        </div>
    )

}

export default Navbar;