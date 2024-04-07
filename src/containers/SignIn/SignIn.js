import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import '../SignIn/SignIn.css'
import { useEffect, useState } from "react"
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner"
import AppConstants from "../../constants/app-constants"
import HttpService from "../../services/http-service"

let formSubmitted = false;
const SignIn = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        props.handleAppState({
            activeRoute: 'login'
        })
    },[])

    const [inputValue, setInputValue] = useState({
        email: { touched: false, value: '' },
        password: { touched: false, value: '' },
    });

    const [formState, setFormState] = useState({
        submitted: false,
        valid: true,
        touched: false,
        isLoading: false
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [inputErrors, setInputErrors] = useState({
        email: '',
        password: '',
    })

    useEffect(validateFields, [inputValue]);
    useEffect(() => {
        if (formState.touched && formSubmitted) {
            handleRegistration();
        }
    }, [formState]);

    function handleInputChange(event) {
        setInputValue({ ...inputValue, [event.target.id]: { touched: inputValue[event.target.id].touched === true, value: event.target.value } });
    }

    function submitForm() {
        setFormState({
            touched: true,
            submitted: true,
            valid: true,
            isLoading: false
        })
        setFormDirty();
    }

    function handleRegistration() {
        formSubmitted = false;
        if (!formState.valid) {
            setErrorMessage('One or more fields have issues, please try again with valid details.')
        }
        else {
            setErrorMessage('');
            sendData();
        }
    }

    function setFormDirty() {
        formSubmitted = true;
        setInputValue({
            ...inputValue,
            email: {
                touched: true,
                value: inputValue['email'].value
            },
            password: {
                touched: true,
                value: inputValue['password'].value
            }
        }
        );
    }

    function validateFields() {
        let error = {};
        let formStateDetail = {
            touched: formState.touched || formSubmitted,
            valid: true,
            submitted: formSubmitted,
            isLoading: false
        }
        if (inputValue.email.touched && !inputValue.email.value.match(/^\S+@\S+\.\S+$/)) {
            error.email = 'Please enter valid email';
            formStateDetail.valid = false;
        }
        if (inputValue.password.touched && !inputValue.password.value.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            error.password = 'Password must be atleast 8 characters long with one special character, one letter and one digit';
            formStateDetail.valid = false;
        }

        setInputErrors(error);

        if (formSubmitted) {
            setFormState(formStateDetail);
        }
    }

    const sendData = async () => {
        let formStateDetail = {
            touched: false,
            valid: true,
            submitted: false,
            isLoading: true
        }
        setFormState(formStateDetail);
        const body = JSON.stringify({
            email: inputValue.email.value,
            password: inputValue.password.value
        });
       
        await HttpService.post(AppConstants.UserService.BaseUrl + AppConstants.UserService.Login, body)
            .then(async response => {
                formStateDetail.isLoading = false;
                setFormState(formStateDetail);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) })
                }
                else {
                    const json = await response.json();
                    props.handleUserState({
                        userName:json.userName
                    })

                    localStorage.setItem('userDetails', JSON.stringify(json));
                    navigate('/home');
                }
            }).catch(error => {
                setErrorMessage(error.message);
                localStorage.removeItem('userDetails');
            })
    }

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
                                    {errorMessage !== '' ? <ErrorBanner message={errorMessage}></ErrorBanner> : null}
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" value={inputValue.email.value} disabled={formState.isLoading} onChange={handleInputChange} />
                                        {inputErrors.email ? <small className="error">{inputErrors.email}</small> : null}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" value={inputValue.password.value} disabled={formState.isLoading} onChange={handleInputChange} />
                                        {inputErrors.password ? <small className="error">{inputErrors.password}</small> : null}
                                    </div>

                                    {
                                        formState.isLoading ? <button type="button" className="btn btn-primary-hover-outline mt-4" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;<span>Signing in...</span></button> :
                                            <button type="button" className="btn btn-primary-hover-outline mt-4" onClick={submitForm}>Sign In</button>
                                    }
                                    {!formState.isLoading ? <small className="signup-text">Don't have an account? &nbsp;<Link className="nav-link" to="/register">Sign up now</Link></small> : null}
                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>)
}

export default SignIn;