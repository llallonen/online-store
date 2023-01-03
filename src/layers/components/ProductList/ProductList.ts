import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductItemSmall } from '../ProductItemSmall/ProductItemSmall';
import { IProductListProps, ProductListType } from './ProductList.types';
import './ProductList.scss';

class ProductList {
    private container: HTMLElement;
    private observer: Observer;
    private products: IBasketProduct[];
    private type: ProductListType;
    private basket: IBasketProduct[];
    constructor({ container, observer, products, type, basket }: IProductListProps) {
        this.container = container;
        this.observer = observer;
        this.products = products;
        this.type = type;
        this.basket = basket;
    }

    public render() {
        const productList = document.createElement('div');
        productList.classList.add('ProductList');
        if (this.type === ProductListType.big) {
            this.products.forEach((product) => {
                const inBasket = this.basket.filter((basketProduct) => basketProduct.id === product.id).length !== 0;
                new ProductItem({
                    container: productList,
                    observer: this.observer,
                    product: product,
                    inBasket: inBasket,
                }).render();
            });
        }
        if (this.type === ProductListType.small) {
            this.products.forEach((product) => {
                const inBasket = this.basket.filter((basketProduct) => basketProduct.id === product.id).length !== 0;
                new ProductItemSmall({
                    container: productList,
                    observer: this.observer,
                    product: product,
                    inBasket: inBasket,
                }).render();
            });
        }
        this.container.append(productList);
    }
}

export { ProductList };
