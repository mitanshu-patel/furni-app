const AppConstants = {
    UserService:
    {
        BaseUrl: 'http://localhost:7258/api/userservice/',
        Register: 'v1/users',
        Login: 'v1/users/authenticate'
    },
    ProductService:{
        BaseUrl: 'http://localhost:7125/api/productservice/',
        GetProducts: 'v1/products',
    },
    OrderService:{
        BaseUrl: 'http://localhost:7169/api/orderservice/',
        AddOrder: 'v1/orders',
    }
}

export default AppConstants;