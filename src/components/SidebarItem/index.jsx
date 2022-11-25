import styles from './style.module.scss';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserPlus, faUserSecret, faCog, faDollarSign, faExchangeAlt } from '@fortawesome/fontawesome-free-solid'


function SidebarItem(props) {
    const { text, icon, onClick } = props;
    const navigate = useNavigate();

    const ItemAction = (ItemRoute) => {
        navigate('/' + ItemRoute);
    }

    if(icon == "faUsers")
        var icc = faUsers;
    else if(icon == "faUserPlus")
        var icc = faUserPlus;
    else if(icon == "faUserSecret")
        var icc = faUserSecret;
    else if(icon == "faCog")
        var icc = faCog;
    else if(icon == "faDollarSign")
        var icc = faDollarSign;
    else if(icon == "faExchangeAlt")
        var icc = faExchangeAlt;

    return (
        <div className={styles.sidebar_item} onClick={() => ItemAction(onClick)}>
            <FontAwesomeIcon icon={icc} /> {text}
        </div>
    );
}

export default SidebarItem;