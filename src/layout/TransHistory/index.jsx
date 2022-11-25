import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Toggle from "../../components/Toggle";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, TransactionsHistoryList } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faExclamationTriangle, faExchangeAlt } from '@fortawesome/fontawesome-free-solid'
import { notification } from '../../state/action';
import JCalendar from 'reactjs-persian-calendar'
import slideImg1 from '../../assets/image/loading.gif';


function TransHistory() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const [from, setFrom] = useState(" ")
    const [to, setTo] = useState(" ")

    const [emptyList, setEmptyList] = useState()

    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState()

    const nowDate = new Date();
    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const getList = (page, pageSizeI) => {
        TransactionsHistoryList(pageSizeI, page)
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
                console.log(e);
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

        getList(1, pageSize)

    }, [])

    const search = () => {
        setLoading(true)
        TransactionsHistoryList(10, 1, searchQuery)
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
                    console.log(e);
                })
        
    }

    const itemPerPage = () => {
        setLoading(true)
        setPageSize(document.getElementById("itemPPage") .value)
         const page_size = document.getElementById("itemPPage") .value;

         TransactionsHistoryList(page_size, 1, "")
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
                    console.log(e);
                })
    }

    const changeSearchType = () => {
        const searchType = document.getElementById("searchSelect").value;
        if(searchType != "")
            setSearchQuery(parseInt(searchType));
        else
            setSearchQuery("")
    }


    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.search_add}>
                   
                </div>

                <div className={styles.search_container}>
                    <label htmlFor="">جستجو تراکنش براساس نوع تراکنش : </label>
                    <select onChange={changeSearchType} id="searchSelect">
                        <option value="">همه</option>
                        <option value="0">بارگذاری تراکنش</option>
                        <option value="1">تاید تراکنش</option>
                        <option value="2">رد تراکنش</option>
                    </select>
                    <Button
                        text="جستجو"
                        onClick={search}
                    />
                </div>

                {emptyList != true ?
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

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>نوع</th>
                                <th>توضیحات</th>
                                <th>کاربر</th>
                                <th>تاریخ و زمان</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, item) => (
                                <tr>
                                    <td>{item + 1}</td>
                                    <td>{customer.type}</td>
                                    <td>{customer.description}</td>
                                    <td>{customer.creator}</td>
                                    <td>{customer.createdDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    { loading == true ?<img className={styles.loading_gif} src={slideImg1} alt="" /> : ""}
                </div>
                :
                 <div className={styles.empty_alert}>
                     <FontAwesomeIcon icon={faExclamationTriangle} />
                     <span>موردی یافت نشد</span>
                 </div>
                 }
                 {emptyList != true ?
                <div className={styles.pagination}>
                    <div onClick={() => getList(page-1, pageSize)} className={styles.prev + " " + (page!=1 ? styles.show : styles.hide)}> قبلی </div>
                    <span className={styles.cur_page}>{page}</span>
                    <div onClick={() => getList(page+1, pageSize)} className={styles.next + " " + (totalPage>0 ? styles.show : styles.hide)}> بعدی </div>
                </div>
                :""}
            </div>
        </div>
    );
};

export default TransHistory;