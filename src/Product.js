/* eslint-disable no-unused-expressions */
const Product = {
    cart: [],
    length: 0,
    total: 0,
    addToCart(data) {
        this.length += 1;
        this.total += data.product_price;
        this.cart.push(data);
    },
    removeProduct(data) {
        this.length -= 1;
        this.total -= data.product_price;
        this.cart.splice(this.cart.indexOf(data), 1);
    },
    saveDataToLocal() {
        localStorage.setItem('__CART', JSON.stringify(this.cart));
    },
    getCartData() {
        const getLocalCart = JSON.parse(localStorage.getItem('__CART'));
        if (getLocalCart) {
            getLocalCart.forEach((data) => {
                this.addToCart(data);
            });
        }
    },
    getCartLength() {
        return this.length;
    },
};

export default Product;
