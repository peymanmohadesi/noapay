import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getCostomerList, deleteCustomer } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faExclamationTriangle } from '@fortawesome/fontawesome-free-solid'

import slideImg1 from '../../assets/image/loading.gif';
import { notification } from '../../state/action';

function CustomerList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const [emptyList, setEmptyList] = useState()

    const [loading, setLoading] = useState(true)

    const [searchQuery1, setSearchQuery1] = useState()
    const [searchQuery2, setSearchQuery2] = useState()

    const nowDate = new Date();
    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const getList = (page, pageSizeI) => {
        getCostomerList("", "", page, pageSizeI)
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


    const addNewCustomer = () => {
        navigate("/add-new-customer")
    }

    const editUser = (userId) => {
        navigate("/edit-customer?userid=" + userId)
    }

    const search = () => {
        setLoading(true)
        getCostomerList(searchQuery2, searchQuery1, 1, 10)
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

        getCostomerList("", "", 1, page_size)
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

    const deleteCustomer1 = (id) => {
        if (window.confirm('مشتری حذف شود؟')) {
            deleteCustomer(id)
                .then(response => {
                    dispatch(notification({ message: 'مشتری با موفقیت حذف شد', type: 'suc', id: nowDate.getSeconds() }))
                    getCostomerList("", "", 1, pageSize)
                        .then(response1 => {
                            setLoading(false)
                            setCustomers(response1.data.data.list);
                            setPage(response1.data.data.page)
                            setTotal(response1.data.data.total)
                            setTotalPage(response1.data.data.totalPage)

                            if (response1.data.data.list.length == 0)
                                setEmptyList(true)
                            else
                                setEmptyList(false)
                        })
                        .catch(e1 => {
                            console.log(e1);
                        })
                })
                .catch(e => {
                    dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                })
        } else {

        }
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.search_add}>
                    <div className={styles.add_btn} onClick={addNewCustomer}><FontAwesomeIcon icon={faUserPlus} /> افزودن مشتری</div>
                </div>
                <div className={styles.search_container}>
                    <div>
                        <Input
                            placeholder="کد ملّی مشتری"
                            type="text"
                            value={searchQuery1}
                            onChange={setSearchQuery1}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="نام مشتری"
                            type="text"
                            value={searchQuery2}
                            onChange={setSearchQuery2}
                        />
                    </div>
                    <Button
                        text="جستجو"
                        onClick={search}
                    />
                </div>

                {emptyList != true ?
                    <div className={styles.customer_list}>
                        <div className={styles.list_header}>لیست مشتریان
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
                                    <th>نام مشتری</th>
                                    <th>شماره شبا</th>
                                    <th>وضعیت کارت ملی</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, item) => (
                                    <tr>
                                        <td>{item + 1}</td>
                                        <td>{customer.name.split("|")[0] + " " + customer.name.split("|")[1]}</td>
                                        <td>{customer.isbn}</td>
                                        <td>{customer.isExpired == false ? "معتبر" : <span>منقضی شده</span>}</td>
                                        <td><Button
                                            text="مشاهده و ویرایش"
                                            onClick={() => editUser(customer.id)}
                                        />
                                            <Button
                                                text="حذف"
                                                onClick={() => deleteCustomer1(customer.id)}
                                            /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loading == true ? <img className={styles.loading_gif} src={slideImg1} alt="" /> : ""}
                    </div>
                    :
                    <div className={styles.empty_alert}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <span>موردی یافت نشد</span>
                    </div>
                }
                {emptyList != true ?
                    <div className={styles.pagination}>
                        <div onClick={() => getList(page - 1, pageSize)} className={styles.prev + " " + (page != 1 ? styles.show : styles.hide)}> قبلی </div>
                        <span className={styles.cur_page}>{page}</span>
                        <div onClick={() => getList(page + 1, pageSize)} className={styles.next + " " + (totalPage > 0 ? styles.show : styles.hide)}> بعدی </div>
                    </div>
                    : ""}
            </div>
        </div>
    );
};

export default CustomerList;