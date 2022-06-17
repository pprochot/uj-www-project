import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./components/Register";
import CreateApartment from "./components/CreateApartment";
import {AuthService} from "./services/AuthService";

function App() {
    // const navigate = useNavigate()
    AuthService.refreshAuth()

    // if (!AuthService.isAuth()) {
    //     navigate("/sign-up")
    // }

    return (
        <Router>
            <Routes>
                {/*<Route path='/' element={ <Home /> } />*/}
                <Route path='/sign-up' element={<Register/>}/>
                <Route path='/apartment/create' element={<CreateApartment/>}/>
                {/*<Route path='/goals' element={ <GoalList /> } />*/}
                {/*<Route path='/events' element={ <EventList /> } />*/}
                {/*<Route path='/error' element={ <ErrorPage /> } />*/}
                {/*<Route path='*' element={ <NotFoundPage /> } />*/}
            </Routes>
        </Router>
    );
}

export default App;