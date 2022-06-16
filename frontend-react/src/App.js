import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import CreateApartment from "./components/CreateApartment";

function App() {

    return (
        <Router>
            <Routes>
                {/*<Route path='/' element={ <Home /> } />*/}
                <Route path='/sign-up' element={ <Register /> } />
                <Route path='/apartment/create' element={ <CreateApartment /> } />
                {/*<Route path='/goals' element={ <GoalList /> } />*/}
                {/*<Route path='/events' element={ <EventList /> } />*/}
                {/*<Route path='/error' element={ <ErrorPage /> } />*/}
                {/*<Route path='*' element={ <NotFoundPage /> } />*/}
            </Routes>
        </Router>
    );
}

export default App;