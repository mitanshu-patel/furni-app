import { Link } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import '../SignIn/SignIn.css'
import { useEffect } from "react"
const SignIn = (props) => {
    useEffect(() => {
        props.handleAppState({
            activeRoute: 'login'
        })
    })
    return (
        <>
            <div className="untree_co-section">
                <div className="container">
                    <div className="block">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 pb-4">
                                <div className="mb-4">
                                    <h1 className="mb-4">Sign In</h1>
                                    <div className="header-underline"></div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary-hover-outline mt-4">Sign In</button>
                                    <small className="signup-text">Don't have an account? &nbsp;<Link className="nav-link" to="/register">Sign up now</Link></small>
                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>)
}

export default SignIn;