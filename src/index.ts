import { Presenter } from './layers/Presenter/Presenter';

const initApp = () => {
    const container = document.querySelector('#app');
    if (!(container instanceof HTMLElement)) {
        return;
    }
    new Presenter({ container });
};

initApp();
