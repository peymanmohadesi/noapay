import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, addBank } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';


function AddCustomer() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name,setName] = useState();
    const [transactionLimit,setTransactionLimit] = useState();
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

    const submitCustomer = () => {
        addBank(name, transactionLimit)
            .then(response => {
                dispatch(notification({ message: 'بانک با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                navigate('/banks-list');
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
            <div className={styles.Profile_form}>
                    <div className={styles.form_header}>افزودن مشتری</div>

                    <div className={styles.form_items}>
                        <Input
                            placeholder="نام بانک: "
                            type="text"
                            value={name}
                            onChange={setName}
                            required="true"
                        />
                        <Input
                            placeholder="محدودیت تراکنش: "
                            type="number"
                            value={transactionLimit}
                            onChange={setTransactionLimit}
                        />

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