import { IHeader } from './Header.types';
import './Header.scss';

class Header {
    private container: HTMLElement;
    private bagCount: number | undefined;
    private totalSum: number | undefined;

    constructor({ container, bagCount, totalSum }: IHeader) {
        this.container = container;
        if (bagCount) {
            this.bagCount = bagCount;
        }
        if (totalSum) {
            this.totalSum = totalSum;
        }
    }

    public render(): void {
        const header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML += `<div class="logo"></div>
        <div class="order-info">
            <div class="total">${this.totalSum ? this.totalSum : 0} $</div>
                <div class="bag">
                    <span class="bag__count">${this.bagCount ? this.bagCount : 0}<span>
                </div>
        </div>`;

        this.container.append(header);

        const basketIcon = header.querySelector('.bag');
        basketIcon?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.location.hash = 'basket';
        });

        const logo = header.querySelector('.logo');
        logo?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.location.hash = '/';
        });
    }

    public update(totalCount: number, bagCount: number): void {
        const totalCountNode = document.querySelector('.total');
        if (totalCountNode) {
            totalCountNode.textContent = `${totalCount} $`;
        }

        const bagCountNode = document.querySelector('.bag__count');
        if (bagCountNode) {
            bagCountNode.textContent = `${bagCount}`;
        }
    }
}

export { Header };
