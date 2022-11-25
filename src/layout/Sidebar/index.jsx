import styles from './style.module.scss';
import SidebarItem from "../../components/SidebarItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from '../../state/action';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nowDate = new Date();

    const userInfo = useSelector(store => store.userInfo);
    var userMenuList = ""
    if(userInfo){
        userMenuList = userInfo.menus;
    }

    const signOut = () => {
        sessionStorage.removeItem("access_token");
        navigate("/login");
        dispatch(notification({ message: 'شما از سیستم خارج شدید', type: 'err', id: nowDate.getSeconds() }))
    }

    return (
        <div className={styles.sidebar}>
            {userMenuList?userMenuList.map((menu) => (
                menu.name == "Admin_Customer" ?
                    <SidebarItem
                    text="لیست مشتریان"
                    icon="faUsers"
                    onClick="customers-list"
                    />: 
                    
                menu.name == "Admin_Role" ?
                    <SidebarItem
                    text="لیست نقش‌ها"
                    icon="faUserSecret"
                    onClick="roles-list"
                    />:

                menu.name == "Admin_User" ?
                    <SidebarItem
                    text="لیست کاربرها"
                    icon="faUsers"
                    onClick="users-list"
                    />:

                menu.name == "Admin_Bank" ?
                    <SidebarItem
                    text="لیست بانک‌ها"
                    icon="faDollarSign"
                    onClick="banks-list"
                    />:

                menu.name == "Admin_Transaction" ?
                    <SidebarItem
                    text="تراکنش‌ها"
                    icon="faExchangeAlt"
                    onClick="transactions"
                    />:

                menu.name == "Admin_Setting" ?
                    <SidebarItem
                    text="تنظیمات"
                    icon="faCog"
                    onClick="settings"
                    />:""
                
            )):""}
            

            <div onClick={signOut} className={styles.logout_btn}><FontAwesomeIcon icon={faSignOutAlt} /> خروج</div>
        </div>
    );
}

export default Sidebar;