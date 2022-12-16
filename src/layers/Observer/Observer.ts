import { IEventObject, ISubscriber } from './Observer.types';

class Observer {
    public subscribers: ISubscriber[];

    constructor() {
        this.subscribers = [];
    }

    subscribe = (subscriber: ISubscriber): void => {
        this.subscribers.push(subscriber);
    };

    unsubscribe = (subscriber: ISubscriber): void => {
        this.subscribers = this.subscribers.filter((el) => el !== subscriber);
    };

    notify = ({ eventName, eventPayload }: IEventObject): void => {
        this.subscribers.forEach((el) => (el.eventName === eventName ? el.function(eventPayload) : null));
    };
}

export default Observer;
