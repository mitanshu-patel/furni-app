import { useEffect, useState } from "react";
import HttpService from "../../services/http-service";
import AppConstants from "../../constants/app-constants";
import '../ProductsList/ProductList.css';

const ProductsList = (props) => {

    const [productList, setProductList] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);
    useEffect(() => {
        if (!productLoaded) {
            getData();
        }
    }, []);

    function addItem(id) {
        const products = productList;
        const index = products.findIndex(v => v.productId == id);
        if (index > -1) {
            products[index].isAdded = true;
            products[index].quantity = 1;
            setProductList([...products]);
            props.handleCartState(products.filter(v => v.isAdded));
        }
    }

    const getData = async () => {
        await HttpService.get(AppConstants.ProductService.BaseUrl + AppConstants.ProductService.GetProducts)
        .then(async response => {
            setProductLoaded(true);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            else {
                const json = await response.json();
                updateProductState(json.products)
            }
        }).catch(error => {
        })
    }

    function updateProductState(products) {
        if (props.cartProducts.length > 0) {
            products.forEach(t => {
                const index = props.cartProducts.findIndex(v => v.productId == t.productId);
                if (index > -1) {
                    t.isAdded = true;
                    t.quantity = props.cartProducts[index].quantity;
                }
            })
        }
        setProductList(products);
    }

    return (
        <div className="untree_co-section product-section before-footer-section">
            <div className="container">
                {productList.length > 0 ? <div className="row">
                    {
                        productList.map(function (v) {
                            return (
                                <div key={v.productId} className={`col-12 col-md-4 col-lg-3 mb-5 ${v.isAdded || !props.userState ? 'item-disabled' : ''}`}>
                                    <a className="product-item" onClick={() => addItem(v.productId)}>
                                        <img src={v.imageUrl} className="img-fluid product-thumbnail" />
                                        <h3 className="product-title">{v.name}</h3>
                                        <strong className="product-price">${v.price}</strong>
                                        {v.isAdded ? <><br /><strong className="product-price">Added to Cart</strong></> : null}
                                        {!props.userState ? <><br /><strong className="product-price">Login to Add to Cart</strong></> : null}
                                        <span className="icon-cross">
                                            <img src="images/cross.svg" className="img-fluid" />
                                        </span>
                                    </a>
                                </div>)
                        })
                    }
                </div> : null}
            </div>
        </div>)
}

export default ProductsList;