import {React} from'react'
import { Switch, Route, Redirect } from "react-router-dom"; 
import ClientsTransactions from "./Pages/AdminOptions/AllClients/ClientsTransactions"
import Home from "./Pages/AdminOptions/Home"
import Pending from "./Pages/AdminOptions/ClientBookings/Pending"
import SuccessFull from './Pages/AdminOptions/ClientBookings/Successfull';
import Rejected from './Pages/AdminOptions/ClientBookings/Rejected';
import Queries from './Pages/AdminOptions/Queries';
import AdminProfile from './Pages/AdminOptions/MyAccount/EditProfile';
import AdminPriceList from './Pages/AdminOptions/MyAccount/MyPriceList';
import DirectPatientPending from "./Pages/AdminOptions/DirectPatientBookings/Pending"
import DirectPatientRejected from "./Pages/AdminOptions/DirectPatientBookings/Rejected"
import DirectPatientSuccess from "./Pages/AdminOptions/DirectPatientBookings/Success"
import Blog from "./Pages/AdminOptions/Blog"
import Blogs from './Pages/AdminOptions/Blogs';
import GCPoints from './Pages/AdminOptions/AllClients/ClientsDetails';
const AdminRoutes = () => {
  return (
    <Switch>
        <Route exact path="/admin/home" component={Home} />
        <Route path="/admin/ClientBookings/Pending" component={Pending}/>
        <Route path="/admin/ClientBookings/Rejected" component={Rejected}/>
        <Route path="/admin/ClientBookings/SuccessFull" component={SuccessFull}/>
        <Route path="/admin/GCPoints" component={GCPoints}/>
        <Route path="/admin/AllClients/ClientsTransactions" component={ClientsTransactions} />
        <Route path="/admin/DirectPatient/Pending" component={DirectPatientPending}/>
        <Route path="/admin/DirectPatient/Rejected" component={DirectPatientRejected}/>
        <Route path="/admin/DirectPatient/Success" component={DirectPatientSuccess}/>
        <Route path="/admin/MyAccount/editProfile" component={AdminProfile}/>
        <Route path="/admin/MyAccount/PriceList" component={AdminPriceList} />
        <Route path="/admin/queries" component={Queries}/>
        <Route path="/admin/blog" component={Blog}/>
        <Route path="/admin/Allblog" component={Blogs}/>
        <Route path="/">
              <Home />
         </Route>
    <Redirect to="/adminHome" />
    </Switch>
  )
}

export default AdminRoutes