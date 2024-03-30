import './Footer.css'
const { Component } = require("react");

class Footer extends Component {
    render() {
        return <footer className="footer-section">
            <div className="container relative">

                <div className="sofa-img">
                    <img src="images/sofa.png" alt="" className="img-fluid" />
                </div>

                <div className="row g-5 mb-5">
                    <div className="col-lg-6">
                        <div className="mb-4 footer-logo-wrap mt-4"><a href="/" className="footer-logo">Furni<span>.</span></a></div>
                        <p className="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>
                    </div>

                    <div className="col-lg-6">
                        <div className="row links-wrap">
                            <div className="menu-grid">
                                    <a href="/">About us</a>
                                    <a href="/">Services</a>
                                    <a href="/">Blog</a>
                                    <a href="/">Contact us</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-top copyright">
                    <div className="row pt-4">
                        <div className="col-lg-6">
                            <p className="mb-2 text-center text-lg-start">Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    }
}

export default Footer;