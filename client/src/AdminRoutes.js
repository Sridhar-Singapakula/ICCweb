import {React} from'react'
import { Switch, Route, Redirect } from "react-router-dom"; 
import ClientsTransactions from "./Pages/AdminOptions/AllClients/ClientsTransactions"
import Home from "./Pages/AdminOptions/Home"
import Queries from './Pages/AdminOptions/Queries';
import AdminProfile from './Pages/AdminOptions/MyAccount/EditProfile';


import Blog from "./Pages/AdminOptions/Blog"
import Blogs from './Pages/AdminOptions/Blogs';
import GCPoints from './Pages/AdminOptions/AllClients/ClientsDetails';
import Event from "./Pages/AdminOptions/Event"
import Events from './Pages/AdminOptions/Events';
import GCparticipants from "./Pages/AdminOptions/GCparticipants";
import GCFinalResults from "./Pages/AdminOptions/GCFinalResults";
import GCGroupResult from "./Pages/AdminOptions/Group/GroupResult";
import GCGroupParticipants from "./Pages/AdminOptions/Group/GroupParticipants";
const AdminRoutes = () => {
  return (
    <Switch>
        <Route exact path="/admin/home" component={Home} />

        <Route path="/admin/GCPoints" component={GCPoints}/>
        <Route path="/admin/AllClients/ClientsTransactions" component={ClientsTransactions} />
        <Route path="/admin/MyAccount/editProfile" component={AdminProfile}/>

        <Route path="/admin/queries" component={Queries}/>
        <Route path="/admin/blog" component={Blog}/>
        <Route path="/admin/Allblog" component={Blogs}/>
        <Route path="/admin/event" component={Event}/>
        <Route path="/admin/Allevent" component={Events}/>
        <Route path="/admin/GCaddparticipants" component={GCparticipants}/>
        <Route path="/admin/GCFinaLResults" component={GCFinalResults}/>
        <Route path="/admin/GCGroupResult" component={GCGroupResult}/>
        <Route path="/admin/GCGroupParticipants" component={GCGroupParticipants}/>

        <Route path="/">
              <Home />
         </Route>
    <Redirect to="/adminHome" />
    </Switch>
  )
}

export default AdminRoutes