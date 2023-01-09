import { IFooter } from './Footer.types';
import './footer.scss';

class Footer {
    private container: HTMLElement;

    constructor({ container }: IFooter) {
        this.container = container;
    }

    public render() {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        footer.innerHTML += `<div class="logo logo--foter"></div>
        <div><a class="footer__rs" href="https://rs.school/js/"><div></div>2023</a></div>
        <div class="footer__links">
            <a href="https://github.com/llallonen" class="link link--github"></a>
            <a href="https://github.com/webbomj" class="link link--github"></a>
        </div>`;

        this.container.append(footer);

        const logo = footer.querySelector('.logo');
        logo?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            window.location.hash = '/#';
        });
    }
}

export { Footer };
