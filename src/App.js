import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './screens/DashBoard';
import LoginPage from './screens/LoginPage';
import Message from './components/Message';
import { useSelector } from 'react-redux';
import Profile from './layout/Profile'
import CustomerList from './layout/CustomerList';
import AddCustomer from './layout/AddCustomer';
import EditCustomer from './layout/EditCustomer';
import RolesList from './layout/RolesList';
import AddRole from './layout/AddRole';
import UserList from './layout/UserList';
import AddUser from './layout/AddUser';
import Settings from './layout/Settings';
import EditSetting from './layout/EditSetting';
import BankList from './layout/BankList'
import AddBank from './layout/AddBank'
import Transactions from './layout/Transactions'
import AddTransaction from './layout/AddTransaction'
import TransHistory from './layout/TransHistory'
import BankDailyReport from './layout/BankDailyReport'

function App() {
    const notification = useSelector(store => store.notification);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/' element={<DashBoard />} />
                <Route path="/edit-profile" element={<Profile />}/> 
                <Route path="/customers-list" element={<CustomerList />}/> 
                <Route path="/add-new-customer" element={<AddCustomer />}/> 
                <Route path="/edit-customer" element={<EditCustomer />}/> 

                <Route path="/roles-list" element={<RolesList />}/> 
                <Route path="/add-role" element={<AddRole />}/> 

                <Route path="/users-list" element={<UserList />}/> 
                <Route path="/add-new-user" element={<AddUser />}/> 

                <Route path="/settings" element={<Settings />}/> 
                <Route path="/edit-setting" element={<EditSetting />}/> 

                <Route path="/banks-list" element={<BankList />}/>
                <Route path="/add-new-bank" element={<AddBank />}/>

                <Route path="/transactions" element={<Transactions />}/>
                <Route path="/new-transaction" element={<AddTransaction />}/>
                <Route path="/transactions-history" element={<TransHistory />}/>

                <Route path="/bank-daily-report" element={<BankDailyReport />}/>
            </Routes>
            {notification && <Message msg={notification.message} type={notification.type} id={notification.id} />}
        </BrowserRouter>
    );
}

export default App;