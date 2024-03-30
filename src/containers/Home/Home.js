import Blog from "../../components/Blog/Blog";

const { Component } = require("react");
const { default: Header } = require("../../components/Header/Header");
const { default: WhyUs } = require("../../components/WhyUs/WhyUs");
const { default: Hero } = require("../../components/Hero/Hero");
const { default: Testimonial } = require("../../components/Testimonial/Testimonial");
const { default: Footer } = require("../../components/Footer/Footer");

const buttonProp = {
    name: 'Shop Now',
    class: 'btn btn-secondary me-2'
}
class Home extends Component {
    componentDidMount(){
        this.props.handleAppState({
            activeRoute:'home'
        });
    }
    render() {
        return (<>
            {/* <Header activeRoute="home"></Header> */}
            <Hero title="Modern Interior" subTitle=" Design Studio" isShowImage="true" description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." buttonData={buttonProp}></Hero>
            <WhyUs></WhyUs>
            <Testimonial></Testimonial>
            <Blog></Blog>
            {/* <Footer></Footer> */}
        </>)
    }
}

export default Home;