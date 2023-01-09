import { IFooter } from './Footer.types';
import './footer.scss';

class Footer {
    private container: HTMLElement;

    constructor({ container }: IFooter) {
        this.container = container;
    }

    public render(): void {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        footer.innerHTML += `<div class="logo logo--foter"></div>
        <div class="footer__links">
            <a href="https://github.com/llallonen" class="link link--github"></a>
            <a href="https://github.com/webbomj" class="link link--github"></a>
        </div>`;
        this.container.append(footer);
    }
}

export { Footer };
