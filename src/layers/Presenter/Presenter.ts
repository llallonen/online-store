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
import { SortType } from '../components/SortPanel/SortPanel.types';
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
        this.fetchGoods();
        this.setHash();
        this.model.setQueryParams();
        this.state = this.model.getState();
        this.view = new View({ container: this.container, observer: this.observer, data: this.state });
        this.subscribe();
        this.listenPopState();
        this.fetchLocalStorage();
    }

    private start(): void {
        console.log('Старт');
        console.log(
            'Оценка 300',
            `
            --Главная страница 120 баллов:
                Реализована фильтрация продуктов +40
                Реализована сортировка продуктов +20
                Реализован текстовый поиск по всем данным продуктов +15
                Реализовано переключение вида найденных продуктов +10
                Реализован роутинг с query-параметрами +10
                Реализованы кнопки сброса и копирования поиска +10
                Реализован блок кол-ва найденных товаров +5
                Поведение карточек найденных товаров +10
            --Корзина товаров 60 баллов
            --Модальное окно 50 баллов
            --Страница продукта 35 баллов:
                Реализованы блоки страницы +25
                Страница открывается в новом окне по ссылке с id/name товара +10
            --Шапка сайта 20 баллов
            --404 страница 10 баллов
        `
        );
    }

    private subscribe(): void {
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
        this.observer.subscribe({ eventName: EventName.clearBasket, function: this.clearBasket.bind(this) });
        this.observer.subscribe({
            eventName: EventName.setCurrentProduct,
            function: this.setCurrentProduct.bind(this),
        });
        this.observer.subscribe({ eventName: EventName.setModalOpen, function: this.setIsModalOpen.bind(this) });
        this.observer.subscribe({ eventName: EventName.changeSearch, function: this.handleChangeSearch.bind(this) });
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

    listenPopState() {
        const listener = () => {
            if (window.location.hash === '#/' || window.location.hash === '#') {
                this.model.updateSort({ sort: SortType.priceASC, type: ProductListType.big });
                this.model.updateFilter({ category: [], brand: [], price: [], stock: [], search: [] });
            }
            this.model.setQueryParams();
            this.getState();
            this.view.update(this.state);
        };
        window.addEventListener('popstate', listener);
    }

    public setHash(): void {
        if (window.location.hash === '' || window.location.hash === '#') {
            window.location.hash = '#/';
        }
        // window.location.hash = '#/';
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

    public fetchGoods(): void {
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

        this.model.updateFilter({ ...this.state.filter, brand: brandFilter });
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
        this.model.updateFilter({ ...this.state.filter, category: [], brand: [], stock: [], price: [] });

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
