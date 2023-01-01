import { FilterList } from '../../components/FilterList/FilterList';
import { IFilterListType } from '../../components/FilterList/FilterList.types';
import { IMain } from '../../components/Main/Main.types';
import { IModelData } from '../../Model/Model.types';
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
        // const slider = `<tc-range-slider value1="30"
        // id="slider-1"
        // value1="40"
        // value2="110"
        // min="0"
        // max="110"
        // step="1"
        // generate-labels="true"
        // pointer-width="15px"
        // pointer-height="15px"
        // pointer-radius="15px"></tc-range-slider>`;
        // this.container.innerHTML = slider;
        // const onChange = (evt: Event) => {
        //     if (evt instanceof CustomEvent) {
        //         this.observer.notify({ eventName: EventName.updatePrice, eventPayload: evt });
        //     }
        // };
        // const $slider = document.getElementById('slider-1');
        // if ($slider) {
        //     $slider.addEventListener('onMouseUp', onChange);
        // }
        this.renderStockFilterList();
    }

    private renderStockFilterList() {
        const filterListBrand = new FilterList({
            container: this.container,
            observer: this.observer,
            allProducts: this.data.goods.products,
            filteredProducts: this.data.basket.products,
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
}

export { MainPage };
