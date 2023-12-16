import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./Pages/AdminDashboard"

import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

import ClientsTransactions from "./Pages/AdminOptions/AllClients/ClientsTransactions"
import AdminHome from "./Pages/AdminOptions/Home";

import Queries from "./Pages/AdminOptions/Queries";
import AdminProfile from "./Pages/AdminOptions/MyAccount/EditProfile";


import Blog from "./Pages/AdminOptions/Blog";

import Blogs from "./Pages/Blogs";
import AdminBlogs from "./Pages/AdminOptions/Blogs"


import Team from "./Pages/Team";
import GC from "./Pages/GC";
import Roots from "./Pages/ClubsInfo/Roots"
import GCPoints from "./Pages/AdminOptions/AllClients/ClientsDetails";
import Event from "./Pages/AdminOptions/Event";
import Events from "./Pages/AdminOptions/Events";
import GCparticipants from "./Pages/AdminOptions/GCparticipants";
import GCFinalResults from "./Pages/AdminOptions/GCFinalResults";
import GCFinalResultsNoPart from "./Pages/AdminOptions/GCFinalResults/WithoutPart";
import GCGroupResult from "./Pages/AdminOptions/Group/GroupResult";
import GCGroupParticipants from "./Pages/AdminOptions/Group/GroupParticipants";
import AllDataFinalResults from "./Pages/AdminOptions/AllData/FinalResults";
import  GCPerformance  from "./Pages/AdminOptions/GCFinalResults/GCPerformance";
import GroupGCName from "./Pages/AdminOptions/GCFinalResults/GroupGCName";
import Insync from "./Pages/ClubsInfo/Insync";



const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);
	
	

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}
		if (user && token) {
			getUser(user._id, dispatch);
		}
	}, [dispatch, user]);
	return (
		<Fragment>
			{user && user.isAdmin &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !=="/insync" &&
				location.pathname !=="/blogs" &&
				location.pathname !=="/team" &&
				location.pathname !=="/GC" &&
				location.pathname !== "/Not-found" && (
					<Fragment>
						<AdminDashboard/>
					</Fragment>
				)}
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute
					exact
					user={user}
					path="/admin/dashboard"
					component={AdminDashboard}
					isAdmin={user && user.isAdmin}
					/>
			
				
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/adminHome" component={AdminHome} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCPoints" component={GCPoints} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/AllClients/ClientsTransactions" component={ClientsTransactions} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/MyAccount/editProfile" component={AdminProfile} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/queries" component={Queries}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/blog" component={Blog}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/Allblog" component={AdminBlogs}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/event" component={Event}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/Allevent" component={Events}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCaddparticipants" component={GCparticipants}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCFinalResults" component={GCFinalResults}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCFinalResultsNoPart" component={GCFinalResultsNoPart}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCGroupResult" component={GCGroupResult}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCGroupParticipants" component={GCGroupParticipants}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/AllData/GCFinalResults" component={AllDataFinalResults}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCperformance" component={GCPerformance}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GroupGCRank" component={GroupGCName}/>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/blogs" component={Blogs}/>
				<Route path="/insync" component={Insync}/>
				<Route path="/team" component={Team}/>
				<Route path="/GC" component={GC}/>
				<Route path="/Not-found" component={NotFound} />
				<Redirect to="/Not-found" />
			</Switch>
		</Fragment>
	);
};

export default App;
