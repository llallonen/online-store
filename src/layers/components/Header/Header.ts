import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IHeader } from './Header.types';
import './header.scss';

class Header {
    private container: HTMLElement;
    private observer: Observer;
    private bagCount: number | undefined;
    private totalSum: number | undefined;

    constructor({ container, observer, bagCount, totalSum }: IHeader) {
        this.container = container;
        this.observer = observer;
        if (bagCount) {
            this.bagCount = bagCount;
        }
        if (totalSum) {
            this.totalSum = totalSum;
        }
    }

    public render() {
        const header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML += `<div class="logo"></div>
        <div class="order-info">
            <div class="total">${this.totalSum ? this.totalSum : 0} $</div>
            <div class="bag">
                <span class="bag__count">${this.bagCount ? this.bagCount : 0}<span>
            </div>
        </div>`;

        header.addEventListener('click', (e: Event) => {
            const eventObject = { eventName: EventName.clickButton, eventPayload: e };
            this.observer.notify(eventObject);
            console.log(eventObject, 'вы нажали на хедер');
        });
        this.container.append(header);
    }
}

export { Header };
