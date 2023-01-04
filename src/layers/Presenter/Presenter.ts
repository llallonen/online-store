import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';
import { addGoodToBasket, removeGoodToBasket } from '../../utils/addGoodToBasket';

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
}

export { Presenter };
