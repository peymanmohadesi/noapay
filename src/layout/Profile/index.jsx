import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, updateProfile } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { notification } from '../../state/action';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(store => store.userInfo);
    const [userName, setUserName] = useState(userData.userName);
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const nowDate = new Date();


    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            getUserInfo()
                .then(response => {
                    dispatch(userInfo(response.data.data))
                })
                .catch(e => {
                    navigate('/login');
                })
        } else {
            navigate('/login');
        }
    }, [])

    const submitProfile = () => {
        updateProfile(userName, name, email)
            .then(response => {
                dispatch(notification({ message: 'پروفایل با موفقیت ذخیره شد', type: 'suc', id: nowDate.getSeconds() }))
            })
            .catch(e => {
                dispatch(notification({ message: 'خطا در ذخیره پروفایل', type: 'err', id: nowDate.getSeconds() }))
            })
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.Profile_form}>
                    <div className={styles.form_header}>اطلاعات حساب کاربری</div>

                    <div className={styles.form_items}>
                        <Input
                            placeholder="نام کاربری: "
                            type="text"
                            value={userName}
                            onChange={setUserName}
                        />
                        <Input
                            placeholder="نام: "
                            type="text"
                            value={name}
                            onChange={setName}
                        />
                        <Input
                            placeholder="ایمیل: "
                            type="text"
                            value={email}
                            onChange={setEmail}
                        />

                        <Button
                            text="ذخیره تغییرات"
                            onClick={submitProfile}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Profile;