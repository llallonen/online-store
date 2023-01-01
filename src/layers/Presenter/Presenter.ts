import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';
import { addGoodToBasket, removeGoodToBasket } from '../../utils/addGoodToBasket';
import data from '../../data.json';

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
        this.observer.subscribe({ eventName: EventName.filterBrand, function: this.filterBrand.bind(this) });
        this.observer.subscribe({ eventName: EventName.filterCategory, function: this.filterCategory.bind(this) });
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
        });
    }

    setHash() {
        window.location.hash = '#';
        window.location.hash = '#/';
    }

    fetchLocalStorage() {
        const localData = localStorage.getItem('online-store2023');
        let data: ILocalStorageData;
        if (localData) {
            data = JSON.parse(localData) as ILocalStorageData;
            if (data?.basketData) {
                this.model.updateState({ type: IActionType.basket, payload: data.basketData });
            }
        }
        console.log(this.model.getState());
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
        this.model.updateState({ type: IActionType.goods, payload: { products: [...data.products] } });
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

        this.model.updateState({
            type: IActionType.filter,
            payload: { ...this.state.filter, brand: brandFilter },
        });
        this.getState();
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

        this.model.updateState({
            type: IActionType.filter,
            payload: { ...this.state.filter, category: categoryFilter },
        });
    }
}

export { Presenter };
