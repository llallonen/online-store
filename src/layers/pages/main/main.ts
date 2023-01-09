import { filterProducts } from '../../../utils/filterProducts';
import { getMaxMinPrice } from '../../../utils/getMaxMinPrice';
import { getMaxMinStock } from '../../../utils/getMaxMinStock';
import { sortProducts } from '../../../utils/sortProducts';
import { FilterList } from '../../components/FilterList/FilterList';
import { IFilterListType } from '../../components/FilterList/FilterList.types';
import { IMain } from '../../components/Main/Main.types';
import { ProductList } from '../../components/ProductList/ProductList';
import { RangeSliderDual } from '../../components/RangeSliderDual/RangeSliderDual';
import { SortPanel } from '../../components/SortPanel/SortPanel';
import { IBasketProduct, IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import './main.scss';

class MainPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;
    private filterProducts: IBasketProduct[];

    constructor({ container, observer, data }: IMain) {
        this.container = container;
        this.observer = observer;
        this.data = data;
        this.filterProducts = sortProducts(
            filterProducts(this.data.filter, this.data.goods.products),
            this.data.sort.sort
        );
    }

    public render(): void {
        const main = document.createElement('div');
        main.classList.add('MainPage');

        const mainContent = `
            <div class="MainPage__sidebar">
                <div class="MainPage__buttons">
                    <button class="MainPage__button--reset button">Reset Filters</button>
                    <button class="MainPage__button--copy button">Copy Link</button>
                </div>
            </div>
            <div class="MainPage__content"></div>
        `;

        main.innerHTML = mainContent;
        this.container.append(main);

        const sidebar: HTMLElement | null = document.querySelector('.MainPage__sidebar');

        if (sidebar) {
            this.renderStockFilterList(sidebar);
            this.renderRangeSliders(sidebar);
            this.listenSidebarButtons();
        }

        const contentBlock: HTMLElement | null = document.querySelector('.MainPage__content');
        if (contentBlock) {
            this.sortPanel(contentBlock);
            this.renderProductList(contentBlock);
        }
    }

    private renderStockFilterList(container: HTMLElement): void {
        const filterListBrand = new FilterList({
            container: container,
            observer: this.observer,
            allProducts: this.data.goods.products,
            filteredProducts: this.filterProducts,
            title: 'Brand',
            type: IFilterListType.brand,
            filter: this.data.filter,
        });

        const filterListCategory = new FilterList({
            container: container,
            observer: this.observer,
            allProducts: this.data.goods.products,
            filteredProducts: this.filterProducts,
            title: 'Category',
            type: IFilterListType.category,
            filter: this.data.filter,
        });

        filterListBrand.render();
        filterListCategory.render();
        this.listenFilter();
    }

    private listenFilter(): void {
        const allInput = document.querySelectorAll('.filterList__input');
        allInput.forEach((el) => {
            el.addEventListener('click', (e: Event) => {
                if (el.classList.contains('category')) {
                    this.observer.notify({
                        eventName: EventName.filterCategory,
                        eventPayload: e,
                    });
                } else {
                    this.observer.notify({
                        eventName: EventName.filterBrand,
                        eventPayload: e,
                    });
                }
            });
        });
    }

    private renderRangeSliders(container: HTMLElement): void {
        const maxMinPriceAllProducts = getMaxMinPrice(this.data.goods.products);
        const maxMinStockAllProducts = getMaxMinStock(this.data.goods.products);

        const priceRangeSlide = new RangeSliderDual({
            container: container,
            observer: this.observer,
            name: 'priceRangeSlider',
            from: this.data.filter.price.length === 0 ? 0 : this.data.filter.price[0],
            to: this.data.filter.price.length === 0 ? maxMinPriceAllProducts.max : this.data.filter.price[1],
            max: maxMinPriceAllProducts.max,
            min: 0,
            eventName: EventName.filterPrice,
        });
        const stockRangeSlide = new RangeSliderDual({
            container: container,
            observer: this.observer,
            name: 'stockRangeSlider',
            from: this.data.filter.stock.length === 0 ? 0 : this.data.filter.stock[0],
            to: this.data.filter.stock.length === 0 ? maxMinStockAllProducts.max : this.data.filter.stock[1],
            max: maxMinStockAllProducts.max,
            min: 0,
            eventName: EventName.filterStock,
        });

        priceRangeSlide.render();
        stockRangeSlide.render();
    }

    private renderProductList(container: HTMLElement): void {
        new ProductList({
            container: container,
            observer: this.observer,
            type: this.data.sort.type,
            products: this.filterProducts,
            basket: this.data.basket.products,
        }).render();
    }

    private sortPanel(container: HTMLElement): void {
        new SortPanel({
            container: container,
            observer: this.observer,
            countProduct: this.filterProducts.length,
            sortType: this.data.sort.sort,
            data: this.data,
        }).render();
    }

    private listenSidebarButtons(): void {
        const buttonReset = document.querySelector('.MainPage__button--reset');
        if (buttonReset) {
            buttonReset.addEventListener('click', (e) => {
                this.observer.notify({ eventName: EventName.clearFilter, eventPayload: e });
            });
        }

        const buttonCopy = document.querySelector('.MainPage__button--copy');
        if (buttonCopy) {
            buttonCopy.addEventListener('click', () => {
                const tempSpan = document.createElement('textarea');
                tempSpan.value = window.location.href;

                this.container.append(tempSpan);
                tempSpan.select();
                tempSpan.setSelectionRange(0, 99999);
                document.execCommand('copy');
                tempSpan.parentNode?.removeChild(tempSpan);
                buttonCopy.textContent = 'Copied';
                tempSpan.remove();
                setTimeout(() => {
                    buttonCopy.textContent = 'Copy Link';
                }, 1000);
            });
        }
    }
}

export { MainPage };
