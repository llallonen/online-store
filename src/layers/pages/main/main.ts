import { filterProducts } from '../../../utils/filterProducts';
import { FilterList } from '../../components/FilterList/FilterList';
import { IFilterListType } from '../../components/FilterList/FilterList.types';
import { IMain } from '../../components/Main/Main.types';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { RangeSliderType } from '../../components/RangeSlider/RangeSlider.types';
import { IBasketProduct, IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
// import 'toolcool-range-slider';

class MainPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;

    constructor({ container, observer, data }: IMain) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const filterProduct = filterProducts(this.data.filter, this.data.goods.products);
        this.renderStockFilterList(filterProduct);
        this.renderRangeSliders();
    }

    private renderStockFilterList(filteredProducts: IBasketProduct[]) {
        const filterListBrand = new FilterList({
            container: this.container,
            observer: this.observer,
            allProducts: this.data.goods.products,
            filteredProducts: filteredProducts,
            title: 'Brand',
            type: IFilterListType.brand,
        });

        const filterListCategory = new FilterList({
            container: this.container,
            observer: this.observer,
            allProducts: this.data.goods.products,
            filteredProducts: this.data.basket.products,
            title: 'Category',
            type: IFilterListType.category,
        });

        filterListBrand.render();
        filterListCategory.render();
        this.listenFilter();
    }

    private listenFilter() {
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

    private renderRangeSliders() {
        const priceRangeSlide = new RangeSlider({
            container: this.container,
            observer: this.observer,
            name: 'priceRangeSlider',
            from: 0,
            to: 100,
            max: 100,
            min: 0,
            type: RangeSliderType.price,
        });
        const stockRangeSlide = new RangeSlider({
            container: this.container,
            observer: this.observer,
            name: 'stockRangeSlider',
            from: 10,
            to: 30,
            max: 50,
            min: 0,
            type: RangeSliderType.stock,
        });

        priceRangeSlide.render();
        stockRangeSlide.render();
    }
}

export { MainPage };
