import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { IAction, IActionType, IModelData, IModelProps } from './Model.types';

class Model {
    private observer: Observer;
    private data: IModelData = {
        count: 1,
        currImg: '',
        basket: {
            limit: 3,
            page: 1,
            products: [],
            promo: [],
        },
        goods: {
            products: [],
        },
    };

    constructor({ observer }: IModelProps) {
        this.observer = observer;
        this.setQueryParams();
    }

    public updateState({ type, payload }: IAction) {
        switch (type) {
            case IActionType.count:
                if (typeof payload !== 'number') {
                    return;
                }
                this.data.count = payload;
                break;
            case IActionType.basket:
                this.data.basket = { ...this.data.basket, ...payload };
                localStorage.setItem('online-store2023', JSON.stringify({ basketData: { ...this.data.basket } }));
                break;
            default:
                break;
        }
        this.notify();
    }

    private notify() {
        this.observer.notify({ eventName: EventName.updateState, eventPayload: this.data });
    }

    public getState(): IModelData {
        return { ...this.data };
    }

    public setQueryParams() {
        const hash = location.hash;
        const query = hash.match(/\?[a-zA-Z=&0-9]{0,}/g);
        if (query && query[0]) {
            const urlParams = new URLSearchParams(query[0]);
            const params = Object.fromEntries(urlParams.entries());
            console.log(query, params); //http://localhost:8080/#basket?ss=2&dd=3  {ss: '2', dd: '3'}
            const queryArray = Object.entries(params);
            console.log('zzzz', queryArray);
            queryArray.forEach((query) => {
                if (query[0] === 'limit' && /\d*/g.test(query[1])) {
                    this.data.basket.limit = Number(query[1]);
                }
                if (query[0] === 'page' && /\d*/g.test(query[1])) {
                    this.data.basket.page = Number(query[1]);
                }
            });
            this.notify();
        }
    }

    public changeImg(imgUrl: string) {
        this.data.currImg = imgUrl;
        this.notify();
    }
}

export { Model };
