import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { login, getUserInfo } from '../../api';
import { useNavigate } from 'react-router-dom';
import { notification } from '../../state/action';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


function LogIn() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nowDate = new Date();


    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const submitLogin = () => {
        let user_captcha_value = document.getElementById('user_captcha_input').value;
        if (userName !== '' && password !== '') {
            login(userName, password)
                .then(response => {
                    if (validateCaptcha(user_captcha_value) == true) {
                        const { data } = response.data;
                        sessionStorage.setItem('access_token', data.token);
                        navigate('/');
                        dispatch(notification({ message: 'ورود موفقیت آمیز', type: 'suc', id: nowDate.getSeconds() }))
                    } else {
                        dispatch(notification({ message: 'عبارت امنیتی نادرست است', type: 'err', id: nowDate.getSeconds() }))
                    }
                })
                .catch(e => {
                    if (e.response.data.Code == "404")
                        dispatch(notification({ message: 'نام کاربری یا کلمه عبور اشتباه است', type: 'err', id: nowDate.getSeconds() }))
                    else if(e.response.data.Code == "400")
                    dispatch(notification({ message: 'دسترسی کاربر توسط مدیر محدود شده است', type: 'err', id: nowDate.getSeconds() }))
                })
        } else {
            dispatch(notification({ message: 'نام کربری و کلمه عبور را وارد کنید', type: 'war', id: nowDate.getSeconds() }))
        }
    }

    const handleKeyboard = (key) => {
        if (key.keyCode === 13) {
            submitLogin()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard, false)
    }, [userName, password])

    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            getUserInfo()
                .then(response => {
                    navigate('/login');
                })
        }
        loadCaptchaEnginge(6);

    }, [])

    return (
        <div className={styles.container}>
            <h1>ورود به نوآپی</h1>
            <Input
                type="text"
                placeholder="نام کاربری"
                value={userName}
                onChange={setUserName}
            />
            <Input
                type="password"
                placeholder="کلمه عبور"
                value={password}
                onChange={setPassword}
            />

            <div className={styles.captcha_div}>
                <div className={styles.captcha_input_container}>
                    <Input
                        id="user_captcha_input"
                        type="text"
                        placeholder="مقدار کادر را وارد کنید"
                        value={captcha}
                        onChange={setCaptcha}
                    />
                </div>
                <div className={styles.captcha_container}>
                    <LoadCanvasTemplateNoReload />
                </div>
            </div>
            <div>
                <Button onClick={submitLogin} text="ورود" />
            </div>
        </div>
    );
};

export default LogIn;
