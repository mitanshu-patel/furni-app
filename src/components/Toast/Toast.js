import '../Toast/Toast.css'
const Toast = (props) => {
    return (<><div className="position-fixed bottom-0 end-0 p-3 show">
        <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">

            <div className="toast-body">
                <button type="button" className="btn-close mr-5" aria-label="Close" onClick={()=>props.handleToast()}></button>
                <span>&nbsp;&nbsp;{props.message}</span>
            </div>
        </div>
    </div></>)
}

export default Toast;

