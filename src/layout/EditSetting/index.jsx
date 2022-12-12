import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, addCustomer, showSetting, updateSetting } from '../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';


function EditSetting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [value, setValue] = useState();
    const nowDate = new Date();

    const [settingid, setSettingid] = useSearchParams();

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


        showSetting(settingid.get("settingid"))
            .then(response => {
                const res = response.data.data;
                setName(res.name)
                setValue(res.value)
            })
            .catch(e => {

            })

    }, [])

    const updateSettingBtn = () => {
        updateSetting(settingid.get("settingid"), value)
            .then(response => {
                dispatch(notification({ message: 'تنظیمات با موفقیت ویرایش شد', type: 'suc', id: nowDate.getSeconds() }))
                navigate('/settings');
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
                    <div className={styles.form_header}>مشاهده و ویرایش تنظیمات</div>

                    <div className={styles.form_items}>
                        <Input
                            placeholder={name}
                            type="text"
                            value={value}
                            onChange={setValue}
                        />
                        <Button
                            text="ثبت اطلاعات"
                            onClick={updateSettingBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSetting;