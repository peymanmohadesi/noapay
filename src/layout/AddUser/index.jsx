import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, addUser, getRolesList } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';


function AddCustomer() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name,setName] = useState();
    const [userName,setUserName] = useState();
    const [password,setPassword] = useState();
    const [repassword,setRepassword] = useState();
    const [email,setEmail] = useState();
    const [roleId,setRoleId] = useState();

    const [roles,setRoles] = useState();
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

                    getRolesList("", 1, 100)
                        .then(response2 => {
                            setRoles(response2.data.data.list);
                            setRoleId(response2.data.data.list[0]["id"])
                        })
                        .catch(e2 => {
                            dispatch(notification({ message: e2.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                        })
                })
                .catch(e => {
                    navigate('/login');
                })
        } else {
            navigate('/login');
        }

    }, [])

    const submitCustomer = () => {
        if(email.indexOf("@") > -1 && email.indexOf(".") > -1) {
            if(password == repassword) {
            addUser(name, userName, password, email, roleId)
                .then(response => {
                    dispatch(notification({ message: 'کاربر با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                    navigate('/users-list');
                })
                .catch(e=> {
                    dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                })
            } else {
                dispatch(notification({ message: 'کلمه‌های عبور همخوانی ندارند', type: 'err', id: nowDate.getSeconds() }))
            }
        } else {
            dispatch(notification({ message: 'فرمت ایمیل نادرست است', type: 'err', id: nowDate.getSeconds() }))
        }
    }

    const assignRoleToUser = () => {
        const currentRoleId = document.getElementById("roleTag").value;
        setRoleId(currentRoleId);
    }

    const navToAddRole =() => {
        navigate('/add-role');
    }


    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
            <div className={styles.Profile_form}>
                    <div className={styles.form_header}>افزودن کاربر</div>

                    <div className={styles.form_items}>
                        <Input
                            placeholder="نام: "
                            type="text"
                            value={name}
                            onChange={setName}
                            required="true"
                        />
                        <Input
                            placeholder="نام کاربری: "
                            type="text"
                            value={userName}
                            onChange={setUserName}
                            required="true"
                        />
                        <Input
                            placeholder="کلمه عبور: "
                            type="password"
                            value={password}
                            onChange={setPassword}
                            required="true"
                        />
                        <Input
                            placeholder="تکرار کلمه عبور: "
                            type="password"
                            value={repassword}
                            onChange={setRepassword}
                            required="true"
                        />
                        <Input
                            placeholder="ایمیل: "
                            type="email"
                            value={email}
                            onChange={setEmail}
                            required="true"
                        />
                        <label>نقش: </label><br />
                        <select className={styles.role_select} onChange={assignRoleToUser} id="roleTag">
                        {roles? roles.map((role) => (
                            <option value={role.id}>{role.name}</option>
                            )):""}
                        </select>
                        <button className={styles.role_btn}
                            onClick={navToAddRole}
                        >افزودن نقش</button>
                        <Button
                            text="ثبت اطلاعات"
                            onClick={submitCustomer}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;