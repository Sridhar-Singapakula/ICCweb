import Home from "./Pages/ClientOptions/Home"

import NewSample from "./Pages/ClientOptions/DataEntry/NewSample"
import RepeatSample from "./Pages/ClientOptions/DataEntry/RepeatSample"
import NewReports from  "./Pages/ClientOptions/PatientReports/NewReports"
import HistoricalReports from "./Pages/ClientOptions/PatientReports/HistoricalReports" 
import {React} from'react'
import { Switch, Route, Redirect } from "react-router-dom"; 
import PaymentClient from "./Pages/ClientOptions/PaymentClient"
import TransactionDetails from "./Pages/ClientOptions/TransactionDetails"
import TrackSample from "./Pages/ClientOptions/SampleTracking/TrackSample"
import AddOns from "./Pages/ClientOptions/DataEntry/Addon"
import CostOfSamples from "./Pages/ClientOptions/CostsOfSamples"
import Profile from "./Pages/ClientOptions/Profile"
import PriceList from "./Pages/ClientOptions/PriceList"
import Query from "./Pages/ClientOptions/Queries"



 const AppRoutes = () => {
  return (
    <Switch>
    <Route path="/clientHome" component={Home} />
    <Route exact path="/clientDataEntry/NewSample" component={NewSample}/>
    <Route path="/client/DataEntry/Add_Ons" component={AddOns}/>
    <Route path="/client/DataEntry/RepeatSample" component={RepeatSample}/>
    <Route path="/client/PatientReports/NewReports" component={NewReports}/>
    <Route path="/client/PatientReports/HistoricalReports" component={HistoricalReports} /> 
    <Route path="/client/Billing/AmountDeposit" component={PaymentClient}/>
    <Route path="/client/Billing/CostOfSamples" component={CostOfSamples}/>
    <Route path="/client/Billing/transactionDetails" component={TransactionDetails}/>
    <Route path="/client/SampleTracking/TrackSample" component={TrackSample}/>
    <Route path="/client/MyAccount/PriceList" component={PriceList}/>
    <Route path="/client/Profile/Edit" component={Profile}/>
    <Route path="/client/query" component={Query}/>

    <Route path="/">
              <Home />
    </Route>
    <Redirect to="/clientHome" /> 
   </Switch>
  );
}

export default AppRoutes
