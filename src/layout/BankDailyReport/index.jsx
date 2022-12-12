import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Toggle from "../../components/Toggle";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, banksDailyReport } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faExclamationTriangle, faExchangeAlt, faDollarSign } from '@fortawesome/fontawesome-free-solid'
import { notification } from '../../state/action';
import JCalendar from 'reactjs-persian-calendar'
import slideImg1 from '../../assets/image/loading.gif';


function BanksDailyReport() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const nowDate = new Date().toLocaleDateString('ir-ir', { day:"numeric", month:"numeric", year:"numeric"});
    const [from, setFrom] = useState("")

    const [emptyList, setEmptyList] = useState()

    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState()

    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const getList = () => {
        banksDailyReport(from)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if(response.data.data.list.length == 0)
                    setEmptyList(true)
                else
                    setEmptyList(false)
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
    }

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

        getList()

    }, [])

    const itemPerPage = () => {
        setLoading(true)
        setPageSize(document.getElementById("itemPPage") .value)
         const page_size = document.getElementById("itemPPage") .value;

         banksDailyReport(from)
                .then(response => {
                    setLoading(false)
                    setCustomers(response.data.data.list);
                    setPage(response.data.data.page)
                    setTotal(response.data.data.total)
                    setTotalPage(response.data.data.totalPage)
                    if(response.data.data.list.length == 0)
                    setEmptyList(true)
                else
                    setEmptyList(false)
                })
                .catch(e => {
                    dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                })
    }

    useEffect(() => {
        document.getElementById("cal1").style.display="none";
        document.getElementById("calBTN1").style.display = "block";
        setLoading(true)
        setFrom(from.replace("-", "/"))
        console.log(from);
        banksDailyReport(from)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if(response.data.data.list.length == 0)
                    setEmptyList(true)
                else
                    setEmptyList(false)
            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
    },[from])

    const showCal = () => {
        document.getElementById("calBTN1").style.display = "none";
        document.getElementById("cal1").style.display = "flex";
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>

                
                <div className={styles.customer_list}>
                    <div className={styles.list_header}>لیست تراکنش‌ها
                    <select onChange={itemPerPage} className={styles.page_size} id="itemPPage">
                        <option disabled selected value="">تعداد آیتم‌ها</option>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>

                    <label htmlFor="">تاریخ </label>
                    {/* <input className={styles.cal} id='from' onChange={changeDate} type="text" /> */}
                   
                    <button id='calBTN1' className={styles.calBTN} onClick={showCal}>انتخاب تاریخ</button>
                    <div id='cal1' className={styles.calHolder}>
                    <JCalendar 
                                locale={'fa'} 
                                color={'#000066'}
                                size={30}
                                onClick={setFrom}
                                itemRender={(key, item, children) => children}
                                id='from'
                    />
                    </div>
                    </div>
                    {emptyList != true ?
                    <table>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>بانک</th>
                                <th>مبلغ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, item) => (
                                <tr>
                                    <td>{item + 1}</td>
                                    <td>{customer.bankName.replace("|", " ")}</td>
                                    <td>{customer.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                

                    :
                    <div className={styles.empty_alert}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <span>موردی یافت نشد</span>
                    </div>
                    }
                </div>
                
                </div>
        </div>
    );
};

export default BanksDailyReport;