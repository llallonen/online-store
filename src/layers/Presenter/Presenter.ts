import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';
import { addGoodToBasket, removeGoodToBasket } from '../../utils/addGoodToBasket';
import data from '../../data.json';
import { RangeSlider } from 'toolcool-range-slider';
import { ProductListType } from '../components/ProductList/ProductList.types';
import { SortType } from '../components/SotrPanel/SortPanel.styles';
import { updateQuery } from '../../utils/updateQuery';

class Presenter {
    private view: View;
    private model: Model;
    private container: HTMLElement;
    private observer: Observer;
    private state: IModelData;
    constructor({ container }: IPresenterProps) {
        this.start();
        this.observer = new Observer();
        this.container = container;
        this.model = new Model({ observer: this.observer });
        this.state = this.model.getState();
        this.view = new View({ container: this.container, observer: this.observer, data: this.state });
        this.fetchGoods();
        this.subscribe();
        this.listenPopState();
        // this.setHash();
        this.fetchLocalStorage();
    }

    start() {
        console.log('Старт');
    }

    subscribe() {
        this.observer.subscribe({ eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) });
        this.observer.subscribe({ eventName: EventName.addGoods, function: this.addGoodToBasket.bind(this) });
        this.observer.subscribe({
            eventName: EventName.changeItemsLimit,
            function: this.changeBasketItemsLimit.bind(this),
        });
        this.observer.subscribe({
            eventName: EventName.changeNavigationPage,
            function: this.addNavigationPage.bind(this),
        });
        this.observer.subscribe({ eventName: EventName.removeGoods, function: this.removeGoodToBasket.bind(this) });
        this.observer.subscribe({ eventName: EventName.addPromoCode, function: this.addPromoCode.bind(this) });
        this.observer.subscribe({ eventName: EventName.removePromoCode, function: this.removePromoCode.bind(this) });
        this.observer.subscribe({ eventName: EventName.clickImg, function: this.handleImgChange.bind(this) });
        this.observer.subscribe({ eventName: EventName.filterBrand, function: this.filterBrand.bind(this) });
        this.observer.subscribe({ eventName: EventName.filterCategory, function: this.filterCategory.bind(this) });
        this.observer.subscribe({ eventName: EventName.filterPrice, function: this.filterPrice.bind(this) });
        this.observer.subscribe({ eventName: EventName.filterStock, function: this.filterStock.bind(this) });
        this.observer.subscribe({
            eventName: EventName.changeViewList,
            function: this.changeViewListProducts.bind(this),
        });
        this.observer.subscribe({ eventName: EventName.setSorting, function: this.setSort.bind(this) });
        this.observer.subscribe({ eventName: EventName.clearFilter, function: this.clearFilter.bind(this) });
    }

    handleImgChange(e: Event | IModelData): void {
        if (!(e instanceof PointerEvent)) {
            return;
        }
        if (!(e.target instanceof HTMLImageElement)) {
            return;
        }

        this.getState();
        const imgUrl: string = e.target.src;

        this.model.changeImg(imgUrl);
        this.getState();
    }

    handleStateUpdate(data: Event | IModelData): void {
        if (data instanceof Event) {
            return;
        }
        this.getState();
        this.view.update(data);
    }

    getState() {
        this.state = this.model.getState();
    }

    listenPopState() {
        window.addEventListener('popstate', () => {
            this.getState();
            this.view.update(this.state);
            this.model.setQueryParams();
            if (window.location.hash === '#/') {
                this.model.updateSort({ sort: SortType.priceASC, type: ProductListType.big });
                this.model.updateFilter({ category: [], brand: [], price: [], stock: [] });
            }
        });
    }

    setHash() {
        window.location.hash = '#';
        window.location.hash = '#/';
    }

    fetchLocalStorage() {
        const localData = {
            basketData: {
                limit: 1,
                page: 3,
                products: [
                    {
                        id: 23,
                        title: 'Leather backpack',
                        description: 'Monochrome leather backpack with decorative element',
                        price: 399,
                        discountPercentage: 12.96,
                        rating: 3.9,
                        color: 'gray',
                        size: 'midi',
                        stock: 6,
                        brand: "D'oro",
                        category: 'backpacks',
                        count: 3,
                        images: [
                            'https://images.unsplash.com/photo-1560892000-4a61808f1940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
                        ],
                    },
                    {
                        id: 24,
                        title: 'Leather backpack',
                        description: 'Bright monochrome leather backpack with cotrast zip closure',
                        price: 469,
                        discountPercentage: 12.96,
                        rating: 4,
                        color: 'blue',
                        size: 'midi',
                        stock: 6,
                        brand: 'David Jones',
                        category: 'backpacks',
                        count: 6,
                        images: [
                            'https://images.unsplash.com/photo-1532697057284-bbe526e18cdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
                        ],
                    },
                    {
                        id: 25,
                        title: 'Work Bag',
                        description: 'Leather crossbody laptop case & tablet day bag',
                        price: 659,
                        discountPercentage: 12.96,
                        rating: 4.6,
                        color: 'brown',
                        size: 'maxi',
                        stock: 6,
                        count: 2,
                        brand: 'David Jones',
                        category: 'backpacks',
                        images: [
                            'https://images.unsplash.com/photo-1608731267464-c0c889c2ff92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
                        ],
                    },
                    {
                        id: 26,
                        title: 'Backpack',
                        description: 'Monochrome minimal backpack',
                        price: 659,
                        discountPercentage: 12.96,
                        rating: 4.6,
                        color: 'black',
                        size: 'midi',
                        stock: 6,
                        count: 2,
                        brand: 'Aldo',
                        category: 'backpacks',
                        images: [
                            'https://burst.shopifycdn.com/photos/backpack-in-black.jpg?width=1850&format=pjpg&exif=1&iptc=1',
                        ],
                    },
                    {
                        id: 27,
                        title: 'Clutch',
                        description: 'Mini cluthc with decorative element',
                        price: 359,
                        discountPercentage: 12.96,
                        rating: 3.8,
                        color: 'pink',
                        size: 'mini',
                        stock: 2,
                        count: 1,
                        brand: "D'oro",
                        category: 'bags',
                        images: [
                            'https://burst.shopifycdn.com/photos/light-brown-clutch.jpg?width=2880&format=pjpg&exif=0&iptc=0',
                        ],
                    },
                    {
                        id: 28,
                        title: 'Clutch',
                        description: 'Mini cluthc with decorative element',
                        price: 359,
                        discountPercentage: 12.96,
                        rating: 3.8,
                        color: 'pink',
                        size: 'mini',
                        count: 1,
                        stock: 2,
                        brand: "D'oro",
                        category: 'bags',
                        images: [
                            'https://burst.shopifycdn.com/photos/light-brown-clutch.jpg?width=2880&format=pjpg&exif=0&iptc=0',
                        ],
                    },
                ],
                promo: [],
                currProduct: {
                    id: 2,
                    title: 'Leather backpack',
                    description: 'A city backpack middle size made of genuine leather',
                    price: 479,
                    discountPercentage: 12.96,
                    rating: 4.5,
                    color: 'brown',
                    size: 'midi',
                    stock: 2,
                    brand: 'Hedgren',
                    category: 'backpacks',
                    images: [
                        'https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg',
                        'https://dxclnrbvyw82b.cloudfront.net/images/product/web/13/24/22/00/0/000000222413_01_800.JPG',
                        'https://dxclnrbvyw82b.cloudfront.net/images/product/web/13/24/22/00/0/000000222413_02_800.JPG',
                        'https://dxclnrbvyw82b.cloudfront.net/images/product/web/13/24/22/00/0/000000222413_03_800.JPG',
                    ],
                },
            },
        };
        let data: ILocalStorageData;
        if (localData) {
            data = localData as ILocalStorageData;
            if (data?.basketData) {
                this.model.updateState({ type: IActionType.basket, payload: data.basketData });
            }
        }
    }

    addGoodToBasket(e: Event | IModelData) {
        if (!(e instanceof MouseEvent)) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        const id = e.target.dataset?.id;
        this.getState();
        if (id) {
            this.model.updateState({
                type: IActionType.basket,
                payload: {
                    ...this.state.basket,
                    products: addGoodToBasket(this.state.basket.products, Number(id), this.state.goods),
                },
            });
        }
    }

    removeGoodToBasket(e: Event | IModelData) {
        if (!(e instanceof Event)) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        const id = e.target.dataset?.id;
        this.getState();

        if (id) {
            this.model.updateState({
                type: IActionType.basket,
                payload: {
                    ...this.state.basket,
                    products: removeGoodToBasket(this.state.basket.products, Number(id)),
                },
            });
        }
    }

    changeBasketItemsLimit(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLInputElement)) {
            return;
        }

        const newLimit = Number(e.target.value);
        if (Number.isNaN(newLimit)) {
            return;
        }
        this.getState();
        this.model.updateState({
            type: IActionType.basket,
            payload: { ...this.state.basket, limit: Number(newLimit), page: 1 },
        });
        this.getState();
        window.location.hash = `#basket?limit=${this.state.basket.limit}&page=${this.state.basket.page}`;
    }

    addNavigationPage(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLButtonElement)) {
            return;
        }

        const typeButton = e.target.dataset?.type;
        this.getState();
        if (typeButton) {
            if (typeButton === 'prev') {
                this.model.updateState({
                    type: IActionType.basket,
                    payload: { ...this.state.basket, page: this.state.basket.page - 1 },
                });
            }
            if (typeButton === 'next') {
                this.model.updateState({
                    type: IActionType.basket,
                    payload: { ...this.state.basket, page: this.state.basket.page + 1 },
                });
            }
            this.getState();
            window.location.hash = `#basket?limit=${this.state.basket.limit}&page=${this.state.basket.page}`;
        }
    }

    addPromoCode(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLElement)) {
            return;
        }

        const type = e.target.dataset?.type;

        if (type) {
            this.getState();
            if (!this.state.basket.promo.includes(type)) {
                this.model.updateState({
                    type: IActionType.basket,
                    payload: { ...this.state.basket, promo: [...this.state.basket.promo, type] },
                });
            }
        }
    }

    removePromoCode(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLElement)) {
            return;
        }
        const type = e.target.dataset?.type;

        if (type) {
            this.getState();
            const promo = this.state.basket.promo.filter((el) => el !== type);
            this.model.updateState({
                type: IActionType.basket,
                payload: { ...this.state.basket, promo: promo },
            });
        }
    }

    fetchGoods() {
        this.model.updateGoods({ products: [...data.products] });
    }

    filterBrand(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLInputElement)) {
            return;
        }
        this.getState();
        const brandFilter: string[] = [];
        const brandNodes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filterList__input.brand');
        brandNodes.forEach((el) => {
            if (el.checked) {
                brandFilter.push(el.id);
            }
        });

        this.model.updateFilter({ ...this.state.filter, brand: brandFilter });
        this.getState();
        this.updateUrl();
        console.log(this.state);
    }

    filterCategory(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLInputElement)) {
            return;
        }
        this.getState();
        const categoryFilter: string[] = [];
        const categoryNodes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filterList__input.category');
        categoryNodes.forEach((el) => {
            if (el.checked) {
                categoryFilter.push(el.id);
            }
        });

        this.model.updateFilter({ ...this.state.filter, category: categoryFilter });
        this.getState();
        this.updateUrl();
    }

    filterPrice(e: Event | IModelData) {
        if (!(e instanceof CustomEvent)) {
            return;
        }
        const target = e.target as RangeSlider;
        this.getState();
        if (
            typeof target.value1 == 'number' &&
            typeof target.value2 == 'number' &&
            !Number.isNaN(target.value1) &&
            !Number.isNaN(target.value2)
        ) {
            this.model.updateFilter({
                ...this.state.filter,
                price: [target.value1, target.value2],
            });

            this.getState();
            this.updateUrl();
        }
    }

    filterStock(e: Event | IModelData) {
        if (!(e instanceof CustomEvent) || !(e.target instanceof HTMLElement)) {
            return;
        }
        const target = e.target as RangeSlider;
        this.getState();
        if (
            typeof target.value1 == 'number' &&
            typeof target.value2 == 'number' &&
            !Number.isNaN(target.value1) &&
            !Number.isNaN(target.value2)
        ) {
            this.model.updateFilter({
                ...this.state.filter,
                stock: [target.value1, target.value2],
            });

            this.getState();
            this.updateUrl();
        }
    }

    changeViewListProducts(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLElement)) {
            return;
        }
        this.getState();

        const type = e.target.dataset.type;
        if (type && type === ProductListType.small) {
            this.model.updateSort({ ...this.state.sort, type: ProductListType.small });
        } else {
            this.model.updateSort({ ...this.state.sort, type: ProductListType.big });
        }

        this.getState();
        this.updateUrl();
    }

    setSort(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLElement)) {
            return;
        }

        const selectedOption = e.target.querySelectorAll('option');
        selectedOption.forEach((option) => {
            if (option.selected) {
                this.getState();
                const sort = option.dataset.type;
                if (sort) {
                    let sortOption = SortType.priceASC;

                    if (sort === SortType.priceDESC) {
                        sortOption = SortType.priceDESC;
                    }
                    if (sort === SortType.ratingASC) {
                        sortOption = SortType.ratingASC;
                    }
                    if (sort === SortType.ratingDESC) {
                        sortOption = SortType.ratingDESC;
                    }
                    this.model.updateSort({ ...this.state.sort, sort: sortOption });
                }
            }
        });

        this.getState();
        this.updateUrl();
    }

    clearFilter() {
        this.model.updateFilter({ ...this.state.filter, category: [], brand: [], stock: [], price: [] });

        this.getState();
        this.updateUrl();
    }

    updateUrl() {
        updateQuery(this.state.filter, this.state.sort);
    }
}

export { Presenter };
