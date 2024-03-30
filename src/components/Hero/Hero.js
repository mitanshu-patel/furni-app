
const Hero = (props) => {
    return (<div className="hero">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-lg-5">
                    <div className="intro-excerpt">
                        <h1>{props.title} <span clsas="d-block">{props.subTitle}</span></h1>
                        {props.subTitle ? (<p className="mb-4">{props.description}</p>) : null}
                        {props.buttonData ? (<p>
                            <a className={props.buttonData.class}>{props.buttonData.name}</a>
                        </p>) : null}
                    </div>
                </div>
                <div className="col-lg-7">
                    {props.isShowImage ? <div className="hero-img-wrap">
                        <img src="images/couch.png" className="img-fluid" />
                    </div> : null}
                </div>
            </div>
        </div>
    </div>)
}


export default Hero;