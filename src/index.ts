import { Presenter } from './layers/Presenter/Presenter';
import './style.scss';

const initApp = (): void => {
    const container: HTMLElement | null = document.querySelector('#app');
    if (!container) {
        return;
    }
    new Presenter({ container });
};

initApp();
