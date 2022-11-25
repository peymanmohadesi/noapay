import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getSettings } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/fontawesome-free-solid'

import slideImg1 from '../../assets/image/loading.gif';


function RoleList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([])
    const [page, setPage] = useState()
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)

    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState()
    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');

    const getList = (page, pageSizeI) => {
        getSettings("", page, pageSizeI)
            .then(response => {
                setLoading(false)
                setRoles(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
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


    const editSetting = (settingId) => {
        navigate("/edit-setting?settingid=" + settingId)
    }

    const search = () => {
        setLoading(true)
        getSettings(searchQuery, 1, 10)
            .then(response => {
                setLoading(false)
                setRoles(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const itemPerPage = () => {
        setLoading(true)
        setPageSize(document.getElementById("itemPPage") .value)
        const page_size = document.getElementById("itemPPage") .value;

        getSettings("", 1, page_size)
            .then(response => {
                setLoading(false)
                setRoles(response.data.data.list);
                setPage(response.data.data.page)
                setTotal(response.data.data.total)
                setTotalPage(response.data.data.totalPage)
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
                <div className={styles.search_container}>
                    <Input 
                        placeholder="جستجو تنظیمات"
                        type="text"
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                    <Button
                        text="جستجو"
                        onClick={search}
                    />
                </div>
                <div className={styles.customer_list}>
                    <div className={styles.list_header}>لیست تنظیمات
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
                                <th>نام</th>
                                <th>مقدار</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, item) => (
                                <tr>
                                    <td>{item+1}</td>
                                    <td>{role.name}</td>
                                    <td>{role.value}</td>
                                    <td><Button
                                        text="مشاهده و ویرایش"
                                        onClick={() => editSetting(role.id)}
                                    /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    { loading == true ?<img className={styles.loading_gif} src={slideImg1} alt="" /> : ""}
                </div>
                <div className={styles.pagination}>
                    <div onClick={() => getList(page-1, pageSize)} className={styles.prev + " " + (page!=1 ? styles.show : styles.hide)}> قبلی </div>
                    <span className={styles.cur_page}>{page}</span>
                    <div onClick={() => getList(page+1, pageSize)} className={styles.next + " " + (totalPage>0 ? styles.show : styles.hide)}> بعدی </div>
                </div>
            </div>
        </div>
    );
};

export default RoleList;