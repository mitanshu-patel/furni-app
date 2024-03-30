import '../Toast/Toast.css'
const Toast = (props) => {
    return (<><div class="position-fixed bottom-0 end-0 p-3 show">
        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">

            <div class="toast-body">
                <button type="button" class="btn-close mr-5" aria-label="Close" onClick={()=>props.handleToast()}></button>
                <span>&nbsp;&nbsp;{props.message}</span>
            </div>
        </div>
    </div></>)
}

export default Toast;

