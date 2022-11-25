import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Toggle from "../../components/Toggle";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getUserList, changeUserState } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faExclamationTriangle } from '@fortawesome/fontawesome-free-solid'

import slideImg1 from '../../assets/image/loading.gif';


function UserList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const [emptyList, setEmptyList] = useState()

    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState()
    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const getList = (page, pageSizeI) => {
        getUserList("", page, pageSizeI)
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


    const addNewCustomer = () => {
        navigate("/add-new-user")
    }

    const editUser = (userId) => {
        navigate("/edit-customer?userid=" + userId)
    }

    const changeUseraState = (id) => {
        changeUserState(id)

        getUserList("", 1, pageSize)
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

    const search = () => {
        setLoading(true)
        getUserList(searchQuery, 1, 10)
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
        const page_size = document.getElementById("itemPPage") .value

        getUserList("", 1, page_size)
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

    return (
        <div>
            <Navbar />
            <Sidebar />
            
            <div className={styles.left_side}>
                <div className={styles.search_add}>
                    <div className={styles.add_btn} onClick={addNewCustomer}><FontAwesomeIcon icon={faUserPlus} /> افزودن کاربر</div>
                </div>

                <div className={styles.search_container}>
                    <Input 
                        placeholder="جستجو کاربر"
                        type="text"
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                    <Button
                        text="جستجو"
                        onClick={search}
                    />
                </div>
                {emptyList != true ?
                <div className={styles.customer_list}>
                    <div className={styles.list_header}>لیست کاربرها
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
                                <th>نام کاربر</th>
                                <th>نام کاربری</th>
                                <th>شماره تماس</th>
                                <th>ایمیل</th>
                                <th>وضعیت (فعال/غیرفعال)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, item) => (
                                <tr>
                                    <td>{item + 1}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.userName}</td>
                                    <td>{customer.phoneNumber == null ? "وارد نشده": customer.phoneNumber}</td>
                                    <td>{customer.email == null ? "وارد نشده": customer.email}</td>
                                    <td>{customer.isActive == true ? <Toggle id={customer.id} onChange={() => changeUseraState(customer.id)} checked={true}/> : <Toggle id={customer.id} onChange={() => changeUseraState(customer.id)} checked={false}/>}</td>
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

export default UserList;