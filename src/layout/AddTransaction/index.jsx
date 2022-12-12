import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, addTransaction } from '../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

import slideImg1 from '../../assets/image/loading.gif';


function AddTransaction() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [transFile, setTransFile] = useState();
    const [loading, setLoading] = useState(false)

    const [unSavedC,setUnSavedC] = useState()
    const [unSavedR,setUnSavedR] = useState([])
   
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

    const addTrans = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        const base64_pure = base64.split(";base64,")[1]
        setTransFile(base64_pure)
        
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = ()=>{
                resolve(fileReader.result)
            }

            fileReader.onerror=(err)=>{
                reject(err)
            }
        })
    }

    const SubmitTransactionBtn = () => {
        setLoading(true)
        addTransaction(transFile)
            .then(response => {
                setLoading(false)
                dispatch(notification({ message: 'تراکنش با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                
                setUnSavedC(response.data.data.unSavedCount)
                setUnSavedR(response.data.data.unsavedList)
                document.getElementById("trans_result_div").style.display = "block"
            })
            .catch(e => {
                setLoading(false)
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
    }

    const navToList = () => {
        navigate('/transactions')
    }
    
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.Profile_form}>
                    <div className={styles.form_header}>افزودن تراکنش</div>

                    <div className={styles.form_items}>
                        <label htmlFor="">فایل را انتخاب کنید: </label>
                        <br />
                        <input
                            className={styles.file_input}
                            type="file"
                            onChange={(e) => {
                                addTrans(e)
                            }}
                        />
                        { loading == true ?<img className={styles.loading_gif} src={slideImg1} alt="" /> : ""}
                        <Button
                            text="افزودن تراکنش"
                            onClick={SubmitTransactionBtn}
                        />
                    </div>
                </div>
                <div id="trans_result_div" className={styles.trans_result_div}>
                    <div>
                        تعداد تراکنش‌های ناموفق: <span className={styles.unSavedSpan}>{unSavedC}</span>
                    </div>
                    <div>
                        لیست سطر تراکنش‌های ناموفق: <span className={styles.unSavedSpan}>{unSavedR.map(item=> item + ", ")}</span>
                    </div>
                    <br />
                    <div onClick={navToList} className={styles.transListBTN}>لیست تراکنش‌ها</div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;