import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Toggle from "../../components/Toggle";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, TransactionList, ConfirmTransaction, deleteTransaction } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faExclamationTriangle, faExchangeAlt, faDollarSign } from '@fortawesome/fontawesome-free-solid'
import { notification } from '../../state/action';
import JCalendar from 'reactjs-persian-calendar'
import slideImg1 from '../../assets/image/loading.gif';


function Transactions() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const [from, setFrom] = useState(" ")
    const [to, setTo] = useState(" ")

    const [transStatus, setTransStatus] = useState(0)

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
        TransactionList(from, to, transStatus, "", "", page, pageSizeI)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if (response.data.data.list.length == 0)
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


    const addNewTransaction = () => {
        navigate("/new-transaction")
    }

    const search = () => {
        setLoading(true)
        TransactionList("", "", 0, searchQuery, "", 1, 10)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if (response.data.data.list.length == 0)
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
        setPageSize(document.getElementById("itemPPage").value)
        const page_size = document.getElementById("itemPPage").value;

        TransactionList(from, to, transStatus, "", "", 1, page_size)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if (response.data.data.list.length == 0)
                    setEmptyList(true)
                else
                    setEmptyList(false)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        setLoading(true)
        setFrom(from.replace("-", "/"))
        setTo(to.replace("-", "/"))
        console.log(from);
        TransactionList(from, to, transStatus, "", "", 1, pageSize)
            .then(response => {
                setLoading(false)
                setCustomers(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
                if (response.data.data.list.length == 0)
                    setEmptyList(true)
                else
                    setEmptyList(false)
            })
            .catch(e => {
                console.log(e);
            })
    }, [from, to, transStatus])

    const transPopUp = () => {
        if (window.confirm('?????????? ???????????? ???????????? ????')) {
            ConfirmTransaction()
                .then(response => {
                    dispatch(notification({ message: '??????????????? ???? ???????????? ???????????? ????????', type: 'suc', id: nowDate.getSeconds() }))
                    setLoading(true)
                    setFrom(from.replace("-", "/"))
                    setTo(to.replace("-", "/"))
                    console.log(from);
                    TransactionList(from, to, transStatus, "", "", 1, pageSize)
                        .then(response => {
                            setLoading(false)
                            setCustomers(response.data.data.list);
                            setPage(response.data.data.page)
                            setTotal(response.data.data.total)
                            setTotalPage(response.data.data.totalPage)
                            if (response.data.data.list.length == 0)
                                setEmptyList(true)
                            else
                                setEmptyList(false)
                        })
                        .catch(e => {
                            console.log(e);
                        })
                })
                .catch(e => {
                    dispatch(notification({ message: '?????? ???? ?????????? ???????????????????', type: 'err', id: nowDate.getSeconds() }))
                })
        } else {

        }
    }

    const showCal = () => {
        document.getElementById("calBTN1").style.display = "none";
        document.getElementById("calBTN2").style.display = "none";
        document.getElementById("cal1").style.display = "flex";
        document.getElementById("cal2").style.display = "flex";
    }

    const deleteTrans = (id) => {

        if (window.confirm('???????????? ?????? ????????')) {

            deleteTransaction(id)
                .then(response => {
                    dispatch(notification({ message: '??????????????? ???? ???????????? ?????? ????', type: 'suc', id: nowDate.getSeconds() }))

                    TransactionList(from, to, 0, "", "", 1, pageSize)
                        .then(response => {
                            setLoading(false)
                            setCustomers(response.data.data.list);
                            setPage(response.data.data.page)
                            setTotal(response.data.data.total)
                            setTotalPage(response.data.data.totalPage)
                            if (response.data.data.list.length == 0)
                                setEmptyList(true)
                            else
                                setEmptyList(false)
                        })
                        .catch(e => {
                            console.log(e);
                        })
                })
                .catch(e => {
                    dispatch(notification({ message: '?????? ???? ?????? ???????????????', type: 'err', id: nowDate.getSeconds() }))
                })

        } else {

        }
    }

    const navToTransHistory = () => {
        navigate("/transactions-history")
    }

    const navToBankReport = () => {
        navigate("/bank-daily-report")
    }

    const changeStatus = () => {
        const newStatus = document.getElementById("statusSelect").value;
        setTransStatus(newStatus)
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.search_add}>
                    <div className={styles.add_btn} onClick={addNewTransaction}><FontAwesomeIcon icon={faUserPlus} /> ???????????? ????????????</div>
                    <div className={styles.add_btn} onClick={navToTransHistory}><FontAwesomeIcon icon={faExchangeAlt} /> ?????????????? ???????????????????</div>
                    <div className={styles.add_btn} onClick={navToBankReport}><FontAwesomeIcon icon={faDollarSign} /> ?????????????? ???????????????</div>
                </div>

                <div className={styles.search_container}>
                    <Input
                        placeholder="?????????? ???????????? ???????????? ???? ?????? ??????????"
                        type="text"
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                    <Button
                        text="??????????"
                        onClick={search}
                    />

                    <br />
                    <select name="" id="statusSelect" onChange={changeStatus} className={styles.statusSelect}>
                        <option value="0">???????????????? ??????</option>
                        <option value="1">?????????? ???????? ????????????</option>
                        <option value="2">???????????? ??????</option>
                        <option value="3">???? ??????</option>
                    </select>
                </div>

                <div className={styles.do_trans_div}>
                    <Button
                        text="???????????? ???????????????????"
                        onClick={transPopUp}
                    />
                </div>

                {emptyList != true ?
                    <div className={styles.customer_list}>
                        <div className={styles.list_header}>???????? ???????????????????
                            <select onChange={itemPerPage} className={styles.page_size} id="itemPPage">
                                <option disabled selected value="">?????????? ???????????????</option>
                                <option value="1">1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>

                            <label htmlFor="">???? ?????????? </label>
                            {/* <input className={styles.cal} id='from' onChange={changeDate} type="text" /> */}

                            <button id='calBTN1' className={styles.calBTN} onClick={showCal}>???????????? ??????????</button>
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
                            <label htmlFor=""> ???? </label>
                            {/* <input className={styles.cal} id='to' onChange={changeDate} type="date" /> */}
                            <button id='calBTN2' className={styles.calBTN} onClick={showCal}>???????????? ??????????</button>
                            <div id='cal2' className={styles.calHolder}>
                                <JCalendar
                                    locale={'fa'}
                                    color={'#000066'}
                                    size={30}
                                    onClick={setTo}
                                    itemRender={(key, item, children) => children}
                                    id='to'
                                />
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>????????</th>
                                    <th>?????? ??????????</th>
                                    <th>??????????</th>
                                    <th>???????? ????????????</th>
                                    <th>??????????</th>
                                    <th>?????????? ??????????</th>
                                    <th>?????????? ??????</th>
                                    <th>???????? ??????</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, item) => (
                                    <tr>
                                        <td>{item + 1}</td>
                                        <td>{customer.customer.name.replace("|", " ")}</td>
                                        <td>{customer.transactionDate}</td>
                                        <td>{customer.transactionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{customer.transactionStatus == 0 ? "???????????????? ??????" : customer.transactionStatus == 1 ? "?????????? ???????? ????????????" : customer.transactionStatus == 2 ? "???????????? ??????" : "???? ??????"}</td>
                                        {/* <td>
                                        <Button text='?????? ????????????'/>
                                        <Button text='???????? ????????'/>
                                    </td> */}
                                    <td>
                                        {customer.client}
                                    </td>
                                    <td>
                                        {customer.isbn}
                                    </td>
                                        <td>
                                            {customer.errorMessage}
                                        </td>
                                        <td>
                                            <Button text='?????? ????????????' onClick={() => deleteTrans(customer.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loading == true ? <img className={styles.loading_gif} src={slideImg1} alt="" /> : ""}
                    </div>
                    :
                    <div className={styles.empty_alert}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <span>?????????? ???????? ??????</span>
                    </div>
                }
                {emptyList != true ?
                    <div className={styles.pagination}>
                        <div onClick={() => getList(page - 1, pageSize)} className={styles.prev + " " + (page != 1 ? styles.show : styles.hide)}> ???????? </div>
                        <span className={styles.cur_page}>{page}</span>
                        <div onClick={() => getList(page + 1, pageSize)} className={styles.next + " " + (totalPage > 0 ? styles.show : styles.hide)}> ???????? </div>
                    </div>
                    : ""}
            </div>
        </div>
    );
};

export default Transactions;