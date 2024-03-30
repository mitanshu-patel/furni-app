import '../ErrorBanner/ErrorBanner.css'
const ErrorBanner = (props) => {
    return (<div className="error-banner">{props.message ? props.message : 'One or more fields have issues, please try again with valid details.'}</div>)
}

export default ErrorBanner;