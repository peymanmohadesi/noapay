import styles from "./style.module.scss"
import { useNavigate } from 'react-router-dom';

function ProfileIcon(props) {
    const {name, userName} = props
    const navigate = useNavigate();
    

    const navToProfile = () => {
        navigate("/edit-profile");
    }

    return (
        <div className={styles.profile}>
            <div onClick={navToProfile} className={styles.profile_circle}>
                {userName[0]}
            </div>
        </div>
    )
}

export default ProfileIcon;