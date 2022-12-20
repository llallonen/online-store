import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IHeader } from './Header.types';
import './header.scss';

class Header {
    private container: HTMLElement;
    private observer: Observer;
    //private bagCount: number;
    //private totalSum: number;

    constructor({ container, observer }: IHeader) {
        this.container = container;
        this.observer = observer;
        //this.bagCount = bagCount;
        //this.total = total;
    }

    public render() {
        const header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML += `<div class="logo"></div><div class="order-info"><div class="total">666$</div><div class="bag"><span class="bag__count">4<span></div></div>`;

        header.addEventListener('click', (e: Event) => {
            const eventObject = { eventName: EventName.clickButton, eventPayload: e };
            this.observer.notify(eventObject);
            console.log(eventObject, 'вы нажали на хедер');
        });
        this.container.append(header);
    }
}

export { Header };
