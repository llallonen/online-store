import { getListBrand } from '../../../utils/getListBrand';
import { getListCategory } from '../../../utils/getListCategory';
import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { FilterItem } from '../FilterItem/FilterItem';
import { IFilterListProps, IFilterListType } from './FilterList.types';
import './FilterList.scss';
import { EventName } from '../../Observer/Observer.types';

class FilterList {
    private container: HTMLElement;
    private observer: Observer;
    private allProducts: IBasketProduct[];
    private filteredProducts: IBasketProduct[];
    private title: string;
    private type: IFilterListType;
    constructor({ container, observer, allProducts, filteredProducts, title, type }: IFilterListProps) {
        this.container = container;
        this.observer = observer;
        this.allProducts = allProducts;
        this.filteredProducts = filteredProducts;
        this.title = title;
        this.type = type;
    }

    public render() {
        const layout = `
          <div class="filterList">
            <h3 class="filterList__header">${this.title}</h3>
            <div id="${this.title}" class="filterList__list" ></div> 
          </div>`;
        this.container.innerHTML += layout;

        this.renderList();
    }

    private renderList() {
        const list = document.getElementById(`${this.title}`);
        if (list instanceof HTMLElement) {
            if (this.type === IFilterListType.brand) {
                const listProducts = getListBrand([...this.allProducts]);
                const filteredListProducts = getListBrand([...this.filteredProducts]);
                listProducts?.forEach((brand) => {
                    const filteredProducts = filteredListProducts.find((product) => product.name === brand.name)?.count;
                    new FilterItem({
                        container: list,
                        observer: this.observer,
                        product: brand,
                        filteredCount: filteredProducts || 0,
                        eventName: EventName.filterCategory,
                    }).render();
                });
            }
            if (this.type === IFilterListType.category) {
                const listProducts = getListCategory([...this.allProducts]);
                const filteredListProducts = getListCategory([...this.filteredProducts]);
                listProducts?.forEach((category) => {
                    const filteredProducts = filteredListProducts.find(
                        (product) => product.name === category.name
                    )?.count;
                    new FilterItem({
                        container: list,
                        observer: this.observer,
                        product: category,
                        filteredCount: filteredProducts || 0,
                        eventName: EventName.filterBrand,
                    }).render();
                });
            }
        }
    }
}

export { FilterList };
