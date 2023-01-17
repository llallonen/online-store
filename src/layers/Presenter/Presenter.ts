import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName, ISubscriber } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';
import { addGoodToBasket, removeGoodToBasket } from '../../utils/changeGoodToBasket';
import data from '../../data.json';
import { RangeSlider } from 'toolcool-range-slider';
import { ProductListType } from '../components/ProductList/ProductList.types';
import { SortType } from '../components/SortPanel/SortPanel.types';
import { updateQuery } from '../../utils/updateQuery';
import { start } from './startMessage';

class Presenter {
    private view: View;
    private model: Model;
    private container: HTMLElement;
    private observer: Observer;
    private state: IModelData;
    constructor({ container }: IPresenterProps) {
        start();
        this.observer = new Observer();
        this.container = container;
        this.model = new Model({ observer: this.observer });
        this.getGoods();
        this.model.setQueryParams();
        this.state = this.model.getState();
        this.view = new View({ container: this.container, observer: this.observer, data: this.state });
        this.subscribe();
        this.listenPopState();
        this.setHash();
        this.fetchLocalStorage();
    }

    private subscribe(): void {
        const observerEvents: ISubscriber[] = [
            { eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) },
            { eventName: EventName.addGoods, function: this.addGoodToBasket.bind(this) },
            {
                eventName: EventName.changeItemsLimit,
                function: this.changeBasketItemsLimit.bind(this),
            },
            {
                eventName: EventName.changeNavigationPage,
                function: this.addNavigationPage.bind(this),
            },

            { eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) },
            { eventName: EventName.addGoods, function: this.addGoodToBasket.bind(this) },
            {
                eventName: EventName.changeItemsLimit,
                function: this.changeBasketItemsLimit.bind(this),
            },
            {
                eventName: EventName.changeNavigationPage,
                function: this.addNavigationPage.bind(this),
            },
            { eventName: EventName.removeGoods, function: this.removeGoodToBasket.bind(this) },
            { eventName: EventName.addPromoCode, function: this.addPromoCode.bind(this) },
            { eventName: EventName.removePromoCode, function: this.removePromoCode.bind(this) },
            { eventName: EventName.clickImg, function: this.handleImgChange.bind(this) },
            { eventName: EventName.filterBrand, function: this.filterBrand.bind(this) },
            { eventName: EventName.filterCategory, function: this.filterCategory.bind(this) },
            { eventName: EventName.filterPrice, function: this.filterPrice.bind(this) },
            { eventName: EventName.filterStock, function: this.filterStock.bind(this) },
            {
                eventName: EventName.changeViewList,
                function: this.changeViewListProducts.bind(this),
            },
            { eventName: EventName.setSorting, function: this.setSort.bind(this) },
            { eventName: EventName.clearFilter, function: this.clearFilter.bind(this) },
            { eventName: EventName.clearBasket, function: this.clearBasket.bind(this) },
            {
                eventName: EventName.setCurrentProduct,
                function: this.setCurrentProduct.bind(this),
            },
            { eventName: EventName.setModalOpen, function: this.setIsModalOpen.bind(this) },
            { eventName: EventName.changeSearch, function: this.handleChangeSearch.bind(this) },
        ];

        observerEvents.forEach((el) => {
            this.observer.subscribe(el);
        });
    }

    public handleImgChange(e: Event | IModelData): void {
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

    public handleStateUpdate(data: Event | IModelData): void {
        if (data instanceof Event) {
            return;
        }
        this.getState();
        this.view.update(data);
    }

    public getState(): void {
        this.state = this.model.getState();
    }

    public listenPopState(): void {
        const listener = () => {
            if (window.location.hash === '#/' || window.location.hash === '#') {
                this.model.updateSort({ sort: SortType.priceASC, type: ProductListType.big });
                this.model.updateFilter({ category: [], brands: [], price: [], stock: [], search: [] });
            }
            this.model.setQueryParams();
            this.getState();
            this.view.update(this.state);
        };
        window.addEventListener('popstate', listener);
    }

    public setHash(): void {
        if (window.location.hash === '' || window.location.hash === '#' || window.location.hash === '#/') {
            window.location.hash = '#/';
        }
    }

    public fetchLocalStorage(): void {
        const localData = localStorage.getItem('online-store2023');
        let data: ILocalStorageData;
        if (localData) {
            data = JSON.parse(localData);
            if (data?.basketData) {
                this.getState();
                this.model.updateState({
                    type: IActionType.basket,
                    payload: { ...this.state.basket, products: data.basketData.products },
                });
            }
        }
    }

    public addGoodToBasket(e: Event | IModelData): void {
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

    public removeGoodToBasket(e: Event | IModelData): void {
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

    public changeBasketItemsLimit(e: Event | IModelData): void {
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

    public addNavigationPage(e: Event | IModelData): void {
        if (!(e instanceof Event) || !(e.target instanceof HTMLButtonElement)) {
            return;
        }

        const typeButton = e.target.dataset?.type;
        this.getState();
        if (typeButton) {
            if (typeButton === 'prev') {
                if (this.state.basket.page !== 1) {
                    this.model.updateState({
                        type: IActionType.basket,
                        payload: { ...this.state.basket, page: this.state.basket.page - 1 },
                    });
                }
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

    public addPromoCode(e: Event | IModelData): void {
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

    public removePromoCode(e: Event | IModelData): void {
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

    public getGoods(): void {
        this.model.updateGoods({ products: [...data.products] });
    }

    public filterBrand(e: Event | IModelData): void {
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

        this.model.updateFilter({ ...this.state.filter, brands: brandFilter });
        this.getState();
        this.updateUrl();
    }

    public filterCategory(e: Event | IModelData): void {
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

    public filterPrice(e: Event | IModelData): void {
        if (!(e instanceof CustomEvent)) {
            return;
        }
        const target = e.target as RangeSlider;
        if (
            typeof target.value1 == 'number' &&
            typeof target.value2 == 'number' &&
            !Number.isNaN(target.value1) &&
            !Number.isNaN(target.value2)
        ) {
            this.getState();
            this.model.updateFilter({
                ...this.state.filter,
                price: [target.value1, target.value2],
            });

            this.getState();
            this.updateUrl();
        }
    }

    public filterStock(e: Event | IModelData): void {
        if (!(e instanceof CustomEvent) || !(e.target instanceof HTMLElement)) {
            return;
        }
        const target = e.target as RangeSlider;
        if (
            typeof target.value1 == 'number' &&
            typeof target.value2 == 'number' &&
            !Number.isNaN(target.value1) &&
            !Number.isNaN(target.value2)
        ) {
            this.getState();
            this.model.updateFilter({
                ...this.state.filter,
                stock: [target.value1, target.value2],
            });

            this.getState();
            this.updateUrl();
        }
    }

    public changeViewListProducts(e: Event | IModelData): void {
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

    public setSort(e: Event | IModelData): void {
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

    public clearFilter(): void {
        this.model.updateFilter({ ...this.state.filter, category: [], brands: [], stock: [], price: [], search: [] });

        this.getState();
        this.updateUrl();
    }

    public updateUrl(): void {
        updateQuery(this.state.filter, this.state.sort);
    }

    public setCurrentProduct(e: Event | IModelData): void {
        if (!(e instanceof Event) || !(e.target instanceof HTMLButtonElement)) {
            return;
        }

        const id = Number(e.target.dataset.idProduct);
        this.getState();
        const product = this.state.goods.products.find((el) => el.id === id);
        if (product) {
            this.model.updateCurrProduct({ ...this.state.currProduct, ...product });
            this.model.changeImg(product.images[0]);
        }
    }

    public clearBasket(): void {
        this.getState();
        this.model.updateState({
            type: IActionType.basket,
            payload: { ...this.state.basket, promo: [], products: [] },
        });
    }

    public setIsModalOpen(e: Event | IModelData): void {
        if (!(e instanceof Event)) {
            return;
        }
        if (e.target instanceof HTMLButtonElement) {
            this.model.updateIsModalOpen(true);
        } else {
            this.model.updateIsModalOpen(false);
        }
        this.getState();
    }

    public handleChangeSearch(e: Event | IModelData): void {
        if (!(e instanceof Event)) {
            return;
        }

        const input: HTMLInputElement | null = document.querySelector('.SortPanel__search');

        if (input) {
            const value = input.value;

            if (value) {
                this.model.updateSearch(value);
                this.getState();
                this.updateUrl();
            }
        }
    }
}

export { Presenter };
