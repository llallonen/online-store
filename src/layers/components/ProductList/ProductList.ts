import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductItemSmall } from '../ProductItemSmall/ProductItemSmall';
import { IProductListProps, ProductListType } from './ProductList.types';
import './ProductList.scss';
import { createElement } from '../../../utils/createElement';

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

    public render(): void {
        const productList = createElement('div', 'ProductList');
        if (this.products.length === 0) {
            productList.innerHTML = `<div class="ProductList__not-found">No products found 😏</div>`;
        }
        const sortPanel = document.querySelector('.SortPanel');
        if (sortPanel) {
            if (this.type === ProductListType.big) {
                productList.classList.remove('ProductList--inLine');
                sortPanel.classList.add('SortPanel--marg');
                this.products.forEach((product) => {
                    const inBasket =
                        this.basket.filter((basketProduct) => basketProduct.id === product.id).length !== 0;
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
                    productList.classList.add('ProductList--inLine');
                    sortPanel.classList.remove('SortPanel--marg');
                    const inBasket =
                        this.basket.filter((basketProduct) => basketProduct.id === product.id).length !== 0;
                    new ProductItemSmall({
                        container: productList,
                        observer: this.observer,
                        product: product,
                        inBasket: inBasket,
                    }).render();
                });
            }
        }
        this.container.append(productList);
    }
}

export { ProductList };
