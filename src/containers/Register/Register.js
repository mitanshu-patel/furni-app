import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import '../Register/Register.css'
import { json, useNavigate } from "react-router-dom"
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner"
import Toast from "../../components/Toast/Toast"

let formSubmitted = false;
const Register = (props) => {
    useEffect(() => {
        props.handleAppState({
            activeRoute: 'login'
        })
    })

    const [formState, setFormState] = useState({
        submitted: false,
        valid: true,
        touched: false,
        isLoading: false
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [inputValue, setInputValue] = useState({
        email: { touched: false, value: '' },
        password: { touched: false, value: '' },
        name: { touched: false, value: '' },
        mobileNo: { touched: false, value: '' },
    });

    const [inputErrors, setInputErrors] = useState({
        email: '',
        password: '',
        name: '',
        mobileNo: ''
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
        // handleRegistration();
    }

    const sendData = async () => {
        let formStateDetail = {
            touched: false,
            valid: true,
            submitted: false,
            isLoading: true
        }
        setFormState(formStateDetail);
        await fetch('http://localhost:7258/api/userservice/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: inputValue.name.value,
                Email: inputValue.email.value,
                Mobile: inputValue.mobileNo.value,
                Password: inputValue.password.value
            })
        }).then(response => {
            formStateDetail.isLoading = false;
            setFormState(formStateDetail);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            else {
                props.handleToastState({
                    successMessage: 'User Added Successfully'
                })
                navigate('/login');
            }
        }).catch(error => {
            setErrorMessage(error.message);
        })
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
            }, mobileNo: {
                touched: true,
                value: inputValue['mobileNo'].value
            },
            name: {
                touched: true,
                value: inputValue['name'].value
            },
        }
        );
    }

    function closeToast() {
        props.handleToastState({
            successMessage: ''
        })
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
        if (inputValue.name.touched && inputValue.name.value.length > 50) {
            error.name = 'Name cannot exceed 50 characters';
            formStateDetail.valid = false;
        }
        if (inputValue.mobileNo.touched && !inputValue.mobileNo.value.match(/[1-9]{1}[0-9]{9}/)) {
            error.mobileNo = 'Please enter correct Mobile No';
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
    return (
        <>
            <div className="untree_co-section">
                <div className="container">
                    <div className="block">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-8 pb-4">
                                <div className="mb-5">
                                    <h1 className="mb-4">Register for Shopping Bliss!</h1>
                                    {errorMessage !== '' ? <ErrorBanner message={errorMessage}></ErrorBanner> : null}
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="Name">Name</label>
                                                <input type="text" className="form-control" id="name" value={inputValue.name.value} disabled={formState.isLoading} onChange={handleInputChange} />
                                                {inputErrors.name ? <small className="error">{inputErrors.name}</small> : null}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="mobileNo">Mobile No</label>
                                                <input type="text" className="form-control" value={inputValue.mobileNo.value} id="mobileNo" disabled={formState.isLoading} onChange={handleInputChange} />
                                                {inputErrors.mobileNo ? <small className="error">{inputErrors.mobileNo}</small> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" value={inputValue.email.value} id="email" disabled={formState.isLoading} onChange={handleInputChange} />
                                        {inputErrors.email ? <small className="error">{inputErrors.email}</small> : null}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="password">Create New Password</label>
                                        <input type="password" className="form-control" value={inputValue.password.value} id="password" disabled={formState.isLoading} onChange={handleInputChange} />
                                        {inputErrors.password ? <small className="error">{inputErrors.password}</small> : null}
                                    </div>

                                    {
                                        formState.isLoading ? <button type="button" className="btn btn-primary-hover-outline mt-4" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;<span>Creating Account...</span>
                                        </button> :
                                            <button type="button" className="btn btn-primary-hover-outline mt-4" onClick={submitForm}>
                                                Create Account
                                            </button>
                                    }

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default Register;