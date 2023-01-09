import { Presenter } from './layers/Presenter/Presenter';
import './style.scss';

const initApp = (): void => {
    const container = document.querySelector('#app');
    if (!(container instanceof HTMLElement)) {
        return;
    }
    new Presenter({ container });
};

initApp();
