import axios from 'axios';

export const login = (username, password) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        username,
        password
    };

    return axios.post(`${baseURL}/AdminProfile/Login`, reqObj);
};

export const getUserInfo = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');

    return axios.get(`${baseURL}/AdminProfile/ShowUserProfile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateProfile = (userName, name, email) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        name: name,
        userName: userName,
        email: email
    };

    return axios.post(`${baseURL}/AdminProfile/EditProfile`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getCostomerList = (Name, NationalCode, page, pageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Name: Name,
        NationalCode: NationalCode,
        page: page,
        pageSize: pageSize,
    };

    return axios.get(`${baseURL}/AdminCustomer/CustomerList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addCustomer = ( name, engName, address, nationalCode, nationalCodeExpirationDate, nationalCardImage, nationalCardImageBack, isbn, accountNumber, mobileNumber, isForeign) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        name: name,
        engName: engName,
        address: address,
        nationalCode: nationalCode,
        nationalCodeExpirationDate: nationalCodeExpirationDate,
        nationalCardImage: nationalCardImage,
        nationalCardImageBack: nationalCardImageBack,
        isbn: isbn,
        accountNumber: accountNumber,
        mobileNumber: mobileNumber,
        isForeign: isForeign
    };

    return axios.post(`${baseURL}/AdminCustomer/CreateCustomer`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getCostomer = (id) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Id: id
    };

    return axios.get(`${baseURL}/AdminCustomer/ShowCustomer`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateCustomer = ( id, name, engName, address, nationalCode, nationalCodeExpirationDate, nationalCardImage, nationalCardImageBack, isbn, accountNumber, mobileNumber) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        id: id,
        name: name,
        engName: engName,
        address: address,
        nationalCode: nationalCode,
        nationalCodeExpirationDate: nationalCodeExpirationDate,
        nationalCardImage: nationalCardImage,
        nationalCardImageBack: nationalCardImageBack,
        isbn: isbn,
        accountNumber: accountNumber,
        mobileNumber: mobileNumber
    };

    return axios.post(`${baseURL}/AdminCustomer/UpdateCustomer`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getRolesList = (name, page, pageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        RoleName: name,
        Page: page,
        PageSize: pageSize,
    };

    return axios.get(`${baseURL}/AdminRole/RoleList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getRole = (id) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Id: id
    };

    return axios.get(`${baseURL}/AdminRole/ShowRole`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const permissionsList = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');

    return axios.get(`${baseURL}/AdminRole/PermissionList`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createRole = (name, persianName) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        name: name,
        persianName: persianName,
    };

    return axios.post(`${baseURL}/AdminRole/CreateRole`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


export const assignPerToRole = (roleId, pers) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        "roleId": roleId,
        "permissions": pers
      };

    return axios.post(`${baseURL}/AdminRole/AssignPermissionToRole`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserList = (Name, page, pageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Name: Name,
        pageSize: pageSize,
        page: page,
    };

    return axios.get(`${baseURL}/AdminUser/UserList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addUser = (name, userName, password, email, roleId) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        name: name,
        userName: userName,
        password: password,
        email: email,
        roleId: roleId
    };

    return axios.post(`${baseURL}/AdminUser/RegisterUser`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const changeUserState = (id) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    return axios.post(`${baseURL}/AdminUser/ChanegUserState?Id=${id}`, "",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getSettings = (Name, page, pageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Name: Name,
        pageSize: pageSize,
        page: page,
    };

    return axios.get(`${baseURL}/AdminSetting/SettingList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const showSetting = (id) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Id: id,
    };

    return axios.get(`${baseURL}/AdminSetting/ShowSetting`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateSetting = (id, value) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        id: id,
        value: value
    };

    return axios.post(`${baseURL}/AdminSetting/UpdateSetting`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getBanks = (Name, page, pageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Name: Name,
        PageSize: pageSize,
        Page: page,
    };

    return axios.get(`${baseURL}/AdminBank/BankList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const changeBankState = (id) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    return axios.post(`${baseURL}/AdminBank/ChanegBankState?Id=${id}`, "",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const showBank = (id) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        Id: id,
    };

    return axios.get(`${baseURL}/AdminBank/ShowBank`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addBank = (name, transactionLimit) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        name: name,
        transactionLimit: transactionLimit
    };

    return axios.post(`${baseURL}/AdminBank/CreateBank`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const addTransaction = (transactionFile) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        transactionFile: transactionFile
    };

    return axios.post(`${baseURL}/AdminTransaction/CreateTransaction`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const TransactionList = (FromDate, ToDate, TransactionStatus, CustomerNationalCode, BankId, Page, PageSize) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        FromDate: FromDate,
        ToDate: ToDate,
        TransactionStatus: TransactionStatus,
        CustomerNationalCode: CustomerNationalCode,
        BankId: BankId,
        Page: Page,
        PageSize: PageSize
    };

    return axios.get(`${baseURL}/AdminTransaction/TransactionList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const ConfirmTransaction = () => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    return axios.post(`${baseURL}/AdminTransaction/ConfirmTransaction`,"", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const uploadFile = (file, fileName) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        file: file,
        fileName: fileName
    };

    return axios.post(`${baseURL}/AdminFile/UploadFile`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const assignMenuToRole = (roleId, menus) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        "roleId": roleId,
        "menuIds": menus
      };

    return axios.post(`${baseURL}/AdminMenu/AssignMenuToRole`, reqObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteTransaction = (id) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    return axios.post(`${baseURL}/AdminTransaction/DeleteTransaction?Id=${id}`, "",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const TransactionsHistoryList = (PageSize, Page, type) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        PageSize: PageSize,
        Page: Page,
        type: type
    };

    return axios.get(`${baseURL}/AdminTransactionHistory/HistoryList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const banksDailyReport = (date) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        "date": date
      };

    return axios.post(`${baseURL}/AdminBank/BankDailyReport`, reqObj,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteCustomer = (id) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    return axios.post(`${baseURL}/AdminCustomer/DeleteCustomer?Id=${id}`, "",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const MenuListApi = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('access_token');
    const reqObj = {
        PageSize: 100,
        Page: 1,
    };

    return axios.get(`${baseURL}/AdminMenu/MenuList`, {
        params: reqObj,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const GetCustomerName = (isbn) => {
    const token = sessionStorage.getItem('access_token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const reqObj = {
        Iban: isbn
    }
    return axios.get(`${baseURL}/AdminCustomer/GetCustomerName`, {
        params: reqObj,
    })
};