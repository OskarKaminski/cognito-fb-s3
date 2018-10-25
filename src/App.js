import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Register from './pages/register'
import Verify from './pages/verify'
import Login from './pages/login'
import Restricted from './pages/restricted'
import FacebookProvider from 'react-facebook-sdk';

class App extends Component {
    render () {
        return (
            <FacebookProvider appId="1851060628350224">
                <div className="App">
                    <Router>
                        <div>
                            <ul>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>

                            <hr/>

                            <Route path="/register" component={Register}/>
                            <Route path="/verify" component={Verify}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/restricted" component={Restricted}/>
                        </div>
                    </Router>
                </div>
            </FacebookProvider>
        );
    }
}

export default App;
