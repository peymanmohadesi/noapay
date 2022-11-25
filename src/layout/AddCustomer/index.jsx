import styles from './style.module.scss';
import { useState, useEffect, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, addCustomer, uploadFile, GetCustomerName } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';
import JCalendar from 'reactjs-persian-calendar'
import slideImg1 from '../../assets/image/loading.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faExchangeAlt } from '@fortawesome/fontawesome-free-solid';


function AddCustomer() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fname, setFname] = useState();
    const [engFname, setEngFname] = useState();
    const [lname, setLname] = useState();
    const [engLname, setEngLname] = useState();
    const [name, setName] = useState(fname + "|" + lname);
    const [engName, setEngName] = useState(fname + "|" + lname);
    const [address, setAddress] = useState();
    const [nationalCode, setNationalCode] = useState();
    const [nationalCodeExpirationDate, setNationalCodeExpirationDate] = useState();
    const [nationalCardImage, setNnationalCardImage] = useState();
    const [nationalCardBackImage, setNnationalCardBackImage] = useState();
    const [isbn, setIsbn] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [isDesabled, setIsDesabled] = useState(false)
    const [nationalCardImageUp, setNationalCardImageUp] = useState(false)
    const [nationalCardImageBackUp, setNationalCardImageBackUp] = useState(false)
    const nowDate = new Date();

    const [checkedU, setCheckedU] = useState(false)


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
        setIsDesabled(true)
        setName(fname + "|" + lname)
        setEngName(engFname + "|" + engLname)
        if (accountNumber.length == 16) {
            // if(isbn.length == 16) {
            if (!checkedU) {
                if (nationalCode.length == 10) {
                    var sumOfIndexes = 0;
                    for (var i = 0; i < 9; i++) {
                        sumOfIndexes += nationalCode[i] * (10 - i);
                    }
                    var extra = sumOfIndexes % 11;
                    if (extra < 2) {
                        if (extra == nationalCode[9]) {
                            addCustomer(name, engName, address, nationalCode, nationalCodeExpirationDate, nationalCardImage, nationalCardBackImage, isbn, accountNumber, mobileNumber, checkedU)
                                .then(response => {
                                    dispatch(notification({ message: 'مشتری با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                                    navigate('/customers-list');
                                    setIsDesabled(false)
                                })
                                .catch(e => {
                                    dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                                    setIsDesabled(false)
                                })
                        } else {
                            dispatch(notification({ message: 'کد ملّی نامعتبر است', type: 'err', id: nowDate.getSeconds() }))
                            setIsDesabled(false)
                        }
                    } else if (extra >= 2) {
                        if ((11 - extra) == nationalCode[9]) {
                            addCustomer(name, engName, address, nationalCode, nationalCodeExpirationDate, nationalCardImage, nationalCardBackImage, isbn, accountNumber, mobileNumber, checkedU)
                                .then(response => {
                                    dispatch(notification({ message: 'مشتری با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                                    navigate('/customers-list');
                                    setIsDesabled(false)
                                })
                                .catch(e => {
                                    dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                                    setIsDesabled(false)
                                })
                        } else {
                            dispatch(notification({ message: 'کد ملّی نامعتبر است', type: 'err', id: nowDate.getSeconds() }))
                            setIsDesabled(false)
                        }
                    }
                } else {
                    dispatch(notification({ message: 'طول کد ملّی باید 10 رقم باشد', type: 'err', id: nowDate.getSeconds() }))
                    setIsDesabled(false)
                }
                // } else {
                //     dispatch(notification({ message: 'طول شماره شبا باید 16 رقم باشد', type: 'err', id: nowDate.getSeconds() }))
                // }
            } else {
                addCustomer(name, engName, address, nationalCode, nationalCodeExpirationDate, nationalCardImage, nationalCardBackImage, isbn, accountNumber, mobileNumber, checkedU)
                    .then(response => {
                        dispatch(notification({ message: 'مشتری با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                        navigate('/customers-list');
                        setIsDesabled(false)
                    })
                    .catch(e => {
                        dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                        setIsDesabled(false)
                    })
            }
        } else {
            dispatch(notification({ message: 'طول شماره کارت باید 16 رقم باشد', type: 'err', id: nowDate.getSeconds() }))
            setIsDesabled(false)
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (err) => {
                reject(err)
            }
        })
    }

    const addImg = async (e1) => {
        setNationalCardImageUp(true)
        const file = e1.target.files[0]
        const base64 = await convertBase64(file)
        const base64_pure = base64.split(";base64,")[1]

        uploadFile(base64_pure, file.name)
            .then(response => {
                setNnationalCardImage(response.data.data.fileAddress)
                setNationalCardImageUp(false)
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                setNationalCardImageUp(false)
            })
    }

    const addImgBack = async (e2) => {
        setNationalCardImageBackUp(true)
        const file = e2.target.files[0]
        const base64 = await convertBase64(file)
        const base64_pure = base64.split(";base64,")[1]

        uploadFile(base64_pure, file.name)
            .then(response => {
                setNnationalCardBackImage(response.data.data.fileAddress)
                setNationalCardImageBackUp(false)
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                setNationalCardImageBackUp(false)
            })
    }

    const fr_check = () => {
        const checked = document.getElementById("fr_check").checked;
        if (checked) {
            setCheckedU(true)
        } else if (!checked) {
            setCheckedU(false)
        }
    }

    const setfname = (ffname) => {
        setFname(ffname)
        setName(ffname + "|" + lname)
    }

    const setlname = (llname) => {
        setLname(llname)
        setName(fname + "|" + llname)
    }

    const setengFname = (efname) => {
        setEngFname(efname)
        setEngName(efname + "|" + engLname)
    }

    const setengLname = (elname) => {
        setEngLname(elname)
        setEngName(engFname + "|" + elname)
    }

    const getNameFromBank = () => {
        if(isbn) {
            GetCustomerName(isbn)
            .then(response => {
                setfname(response.data.data.firstName)
                setlname(response.data.data.lastName)
                setName(response.data.data.firstName+"|"+response.data.data.lastName)
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
        } else {
            alert("فیلد شماره شبا خالی است")
        }
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.Profile_form}>
                    <div className={styles.form_header}>افزودن مشتری</div>
                    <div className={styles.checkDiv}>
                        <input type="checkbox" id='fr_check' onChange={fr_check} />
                        <label htmlFor="">اتباع خارجی</label>
                    </div>
                    <div className={styles.form_items}>
                        <Input
                            placeholder="نام: "
                            type="text"
                            value={fname}
                            onChange={setfname}
                            required="true"
                            clas="inp"
                        />
                        <Input
                            placeholder="نام خانوادگی: "
                            type="text"
                            value={lname}
                            onChange={setlname}
                            required="true"
                            clas="inp"
                        />
                        <Input
                            placeholder="نام انگلیسی: "
                            type="text"
                            value={engFname}
                            onChange={setengFname}
                            required="true"
                            clas="inp"
                        />
                        <Input
                            placeholder="نام خانوادگی انگلیسی: "
                            type="text"
                            value={engLname}
                            onChange={setengLname}
                            required="true"
                            clas="inp"
                        />
                        <Input
                            placeholder="آدرس: "
                            type="text"
                            value={address}
                            onChange={setAddress}
                            required={checkedU == true ? "true" : ""}
                            clas="inp"
                        />
                        <Input
                            placeholder={!checkedU ? "شماره ملّی: " : "شماره فراگیر"}
                            type="text"
                            value={nationalCode}
                            onChange={setNationalCode}
                            required={checkedU == true ? "" : "true"}
                            clas="inp"
                        />
                        <label htmlFor="">تاریخ انقضا کارت ملی: {nationalCodeExpirationDate} </label>
                        <div className={styles.cal_div}>
                            <JCalendar
                                locale={'fa'}
                                color={'#000066'}
                                size={30}
                                onClick={setNationalCodeExpirationDate}
                                itemRender={(key, item, children) => children}
                            />
                        </div>
                        {/* <Input
                            placeholder="تاریخ انقضا کارت ملی: "
                            type="date"
                            value={nationalCodeExpirationDate}
                            onChange={setNationalCodeExpirationDate}
                            required={checkedU == true ? "" : "true" }
                            clas="inp"
                        /> */}
                        <Input
                            placeholder="شماره شبا: "
                            type="text"
                            value={isbn}
                            onChange={setIsbn}
                            required="true"
                            clas="inp"
                        />
                        <button
                        className={styles.getApiBtn}
                        onClick={getNameFromBank}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                        </button>
                        
                        <Input
                            placeholder="شماره کارت: "
                            type="text"
                            value={accountNumber}
                            onChange={setAccountNumber}
                            required="true"
                            clas="inp"
                        />
                        <div className={styles.fdiv}>
                            <Input
                                placeholder="شماره موبایل: "
                                type="text"
                                value={mobileNumber}
                                onChange={setMobileNumber}
                                clas="inp"
                            />
                        </div>
                        <div className={styles.imgDiv}>
                            <label htmlFor="">{!checkedU ? "تصویر کارت ملی " : "تصویر کارت آمایش یا گذرنامه"} </label><br />
                            <input
                                type="file"
                                onChange={(e1) => {
                                    addImg(e1)
                                }}
                            />
                            <img src={!nationalCardImageUp ? "https://dev.autonoapay.ir" + nationalCardImage : slideImg1} alt="" />
                        </div>
                        <div className={styles.imgDiv}>
                            <label htmlFor="">{!checkedU ? "تصویر پشت کارت ملی " : "تصویر ویزا"}</label>
                            <br />
                            <input
                                type="file"
                                onChange={(e2) => {
                                    addImgBack(e2)
                                }}
                            />
                            <img src={!nationalCardImageBackUp ? "https://dev.autonoapay.ir" + nationalCardBackImage : slideImg1} alt="" />
                        </div>

                        <Button
                            text="ثبت اطلاعات"
                            onClick={submitCustomer}
                            disabledT={isDesabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;