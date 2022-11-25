import styles from './style.module.scss';
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, permissionsList, createRole, assignPerToRole, getRolesList, assignMenuToRole, MenuListApi } from '../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userInfo } from '../../state/action';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { notification } from '../../state/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'


function AddRole() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [persianName, setPersianName] = useState();

    const [permisionsList, setPermisionsList] = useState();
    const [menusList, setMenusList] = useState(/*[
        {
            id: "6fbf07e9-84fa-4a08-a359-1f31c4217595",
            name: "Admin_Profile"
        },
        {
            id: "39cad19f-b764-498d-9ee0-b50bac232b29",
            name: "Admin_User"
        },
        {
            id: "d71f1f32-9f31-4f00-a68f-e893444eb8e7",
            name: "Admin_Bank"
        },
        {
            id: "6e03f427-8c12-43a7-bd1d-83cf603c64bc",
            name: "Admin_Role"
        },
        {
            id: "79537064-f07c-4b20-a056-f21bf799d2d5",
            name: "Admin_Setting"
        },
        {
            id: "5b0b6302-35b3-4b41-87b7-5595cd83f5e4",
            name: "Admin_Transaction"
        },
        {
            id: "29dec096-28ab-4f5f-b5d3-4977b604cce4",
            name: "Admin_Customer"
        }
    ]*/);

    const [thisPermisionsList, setThisPermisionsList] = useState([]);
    const [thisMenuList, setThisMenuList] = useState([]);

    const [thisMenuIdList, setThisMenuIdList] = useState([]);

    const nowDate = new Date();

    const [roleId, setRoleId] = useSearchParams();
    

    // for read from redux store but not finished!!
    // const testvalue = useSelector(store => store.test);

    // for calling action
    // // then
    // dispatch('action()');
    const getPermissions = () => {
        permissionsList()
        .then(response => {
            setPermisionsList(response.data.data.list);
        })
        .catch(e => {
            dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
        })

        MenuListApi()
        .then(response => {
            setMenusList(response.data.data.list)
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

        getPermissions()
    }, [])

    const SubmitRoleBtn = () => {
        createRole(name, persianName)
            .then(response => {
                getRolesList(name, 1, 1)
                    .then(response2 => {
                        const addedRole = response2.data.data.list[0]
                        assignPerToRole(addedRole.id, thisPermisionsList)
                            .then(response3 => {
                                assignMenuToRole(addedRole.id, thisMenuIdList)
                                    .then(response4 => {
                                        dispatch(notification({ message: 'نقش با موفقیت افزوده شد', type: 'suc', id: nowDate.getSeconds() }))
                                        navigate('/roles-list');
                                    })
                                    .catch(e4 => {
                                        dispatch(notification({ message: e4.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                                    })
                                
                            })
                            .catch(e3 => {
                                dispatch(notification({ message: e3.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                            })
                    })
                    .catch(e2 => {
                        dispatch(notification({ message: e2.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
                    })

            })
            .catch(e => {
                dispatch(notification({ message: e.response.data.Error.Message, type: 'err', id: nowDate.getSeconds() }))
            })
    }

    const permissionPopUp = () => {
        document.getElementById("all_permissions_list_back").style.display = "block"
    }

    const menusPopUp = () => {
        document.getElementById("all_menus_list_back").style.display = "block"
    }

    const addPerToRole = (per) => {

        if(thisPermisionsList.indexOf(per) <= -1) {
            thisPermisionsList.push(per)
        }
        var thisDom = ""
        for(var item in thisPermisionsList) {
            thisDom += "<div>" + thisPermisionsList[item].split("_v1_")[1] + "</div>"
        }
        document.getElementById("this_pers_dom").innerHTML = thisDom

        document.getElementById("all_permissions_list_back").style.display = "none"
        
    }

    const addMenuToRole = (id, menu) => {
        console.log(menu);
        if(thisMenuList.indexOf(menu) <= -1) {
            thisMenuList.push(menu)
            thisMenuIdList.push(id)
        }
        var thisDom = ""
        for(var item in thisMenuList) {
            thisDom += "<div>" + thisMenuList[item] + "</div>"
        }
        document.getElementById("this_menus_dom").innerHTML = thisDom

        document.getElementById("all_menus_list_back").style.display = "none"
        
    }

    const closePerPop = () => {
        document.getElementById("all_permissions_list_back").style.display = "none"
    }

    const closeMenuPop = () => {
        document.getElementById("all_menus_list_back").style.display = "none"
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.left_side}>
                <div className={styles.Profile_form}>
                    <div className={styles.form_header}>افزودن نقش</div>

                    <div className={styles.form_items}>
                        <Input
                            placeholder="نام نقش: "
                            type="text"
                            value={name}
                            onChange={setName}
                        />
                        <Input
                            placeholder="نام فارسی نقش: "
                            type="text"
                            value={persianName}
                            onChange={setPersianName}
                        />

                        <div className={styles.permissions}>
                            <label htmlFor="">دسترسی ها:</label>
                            <div id='all_permissions_list_back' className={styles.all_permissions_list_back}>
                                <div id='all_permissions_list' className={styles.all_permissions_list}>
                                <div className={styles.exitBtn}>
                                    <FontAwesomeIcon onClick={closePerPop} icon={faPlus} />
                                </div>
                                    {permisionsList && permisionsList.map((permission) => (
                                            <div key={permission} onClick={()=>addPerToRole(permission)}>{ permission.split('_v1_')[1] }</div>
                                        ))}
                                </div>
                            </div>

                            <div className={styles.this_permissions_list}>
                                <div id='this_pers_dom'  className={styles.temp_area}></div>
                                <div onClick={permissionPopUp} className={styles.add_per_btn}><FontAwesomeIcon icon={faPlus} />افزودن دسترسی</div>
                            </div>
                        </div>

                        <div className={styles.permissions}>
                            <label htmlFor="">منوها:</label>
                            <div id='all_menus_list_back' className={styles.all_permissions_list_back}>
                                <div id='all_menus_list' className={styles.all_permissions_list}>
                                <div className={styles.exitBtn}>
                                    <FontAwesomeIcon onClick={closeMenuPop} icon={faPlus} />
                                </div>
                                    {menusList?menusList.map(menu => <div key={menu.id} onClick={()=>addMenuToRole(menu.id, menu.name)}>{ menu.name }</div>
                                        ):""}
                                </div>
                            </div>

                            <div className={styles.this_permissions_list}>
                                <div id='this_menus_dom'  className={styles.temp_area}></div>
                                <div onClick={menusPopUp} className={styles.add_per_btn}><FontAwesomeIcon icon={faPlus} />افزودن منو</div>
                            </div>
                        </div>

                        <Button
                            text="افزودن نقش"
                            onClick={SubmitRoleBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRole;