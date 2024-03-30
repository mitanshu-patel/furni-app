import { Component } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

class Shop extends Component {
    componentDidMount(){
        this.props.handleAppState({
            activeRoute:'shop'
        })
    }
    render() {
        return <>
            <Hero title="Shop"></Hero>
            <ProductsList></ProductsList>
        </>
    }
}

export default Shop;