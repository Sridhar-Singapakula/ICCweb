import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls";
import PrivateRoute from "./PrivateRoute";
import ClientDashboard from "./Pages/ClientDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import NewSample from "./Pages/ClientOptions/DataEntry/NewSample"
import RepeatSample from "./Pages/ClientOptions/DataEntry/RepeatSample"
import NewReports from "./Pages/ClientOptions/PatientReports/NewReports"
import HistoricalReports from "./Pages/ClientOptions/PatientReports/HistoricalReports" 
import PaymentClient from "./Pages/ClientOptions/PaymentClient";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import TransactionDetails from "./Pages/ClientOptions/TransactionDetails"
import TrackSample from "./Pages/ClientOptions/SampleTracking/TrackSample"
import AddOns from "./Pages/ClientOptions/DataEntry/Addon"
import CostOfSamples from "./Pages/ClientOptions/CostsOfSamples";
import Profile from "./Pages/ClientOptions/Profile";
import PriceList from "./Pages/ClientOptions/PriceList"
import Query from "./Pages/ClientOptions/Queries"
import Home from "./Pages/ClientOptions/Home"

import Pending from "./Pages/AdminOptions/ClientBookings/Pending";
import ClientsTransactions from "./Pages/AdminOptions/AllClients/ClientsTransactions"
import AdminHome from "./Pages/AdminOptions/Home";
import SuccessFull from "./Pages/AdminOptions/ClientBookings/Successfull";
import Rejected from "./Pages/AdminOptions/ClientBookings/Rejected";
import Queries from "./Pages/AdminOptions/Queries";
import AdminProfile from "./Pages/AdminOptions/MyAccount/EditProfile";
import AdminPriceList from "./Pages/AdminOptions/MyAccount/MyPriceList";
import DirectPatientPending from "./Pages/AdminOptions/DirectPatientBookings/Pending"
import DirectPatientRejected from "./Pages/AdminOptions/DirectPatientBookings/Rejected"
import DirectPatientSuccess from "./Pages/AdminOptions/DirectPatientBookings/Success"
import Blog from "./Pages/AdminOptions/Blog";
import Patient from "./Pages/DirectPatient";
import Blogs from "./Pages/Blogs";
import AdminBlogs from "./Pages/AdminOptions/Blogs"
import Terms from "./Pages/Terms";

import Team from "./Pages/Team";
import GC from "./Pages/GC";
import Roots from "./Pages/ClubsInfo/Roots"
import GCPoints from "./Pages/AdminOptions/AllClients/ClientsDetails";



const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { user,loading } = useSelector((state) => state.auth);
	
	

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
	if (loading) {
		// Render a loading state until user data is fetched
		return <div>Loading...</div>;
	  }

	return (
		<Fragment>
			{user && user.isAdmin &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !="/roots" &&
				location.pathname !="/blogs" &&
				location.pathname !="/GC" &&
				location.pathname !== "/Not-found" && (
					<Fragment>
						<AdminDashboard/>
					</Fragment>
				)}
			{user && !user.isAdmin &&  user.isClient &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !="/roots" &&
				location.pathname !="/blogs" &&
				location.pathname !="/GC" &&
				location.pathname !== "/Not-found" && (
					<Fragment>
						 <ClientDashboard/>
					</Fragment>
				)}
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute
				exact
				user={user}
				path="/client/dashboard"
				component={ClientDashboard}
				isAdmin={user && !user.isAdmin && user.isClient}
				
				/>
				<PrivateRoute
					exact
					user={user}
					path="/admin/dashboard"
					component={AdminDashboard}
					isAdmin={user && user.isAdmin}
					/>
				<PrivateRoute exact user={user && user.isClient} path="/clientHome" component={Home}/>
				
				
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/adminHome" component={AdminHome} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/ClientBookings/Pending" component={Pending} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/ClientBookings/SuccessFull" component={SuccessFull} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/ClientBookings/Rejected" component={Rejected} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/GCPoints" component={GCPoints} />
				
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/MyAccount/editProfile" component={AdminProfile} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/MyAccount/PriceList" component={AdminPriceList} />
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/queries" component={Queries}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/blog" component={Blog}/>
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/admin/Allblog" component={AdminBlogs}/>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/Patient" component={Patient} />
				<Route path="/blogs" component={Blogs}/>
				<Route path="/terms" component={Terms}/>
				<Route path="/terms" component={Terms}/>
				<Route path="/Roots" component={Roots}/>
				<Route path="/team" component={Team}/>
				<Route path="/GC" component={GC}/>
				<Route path="/Not-found" component={NotFound} />
				<Redirect to="/Not-found" />
			</Switch>
		</Fragment>
	);
};

export default App;
