import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IRangeSliderProps } from './RangeSliderDual.types';
import 'toolcool-range-slider';

class RangeSliderDual {
    private container: HTMLElement;
    private observer: Observer;
    private name: string;
    private from: number;
    private to: number;
    private min: number;
    private max: number;
    private eventName: EventName;
    constructor({ container, observer, name, from, max, min, to, eventName }: IRangeSliderProps) {
        this.container = container;
        this.observer = observer;
        this.name = name;
        this.from = from;
        this.to = to;
        this.min = min;
        this.max = max;
        this.eventName = eventName;
    }

    public render() {
        const slider = `
          <tc-range-slider 
            id="${this.name}"
            min="${this.min}"
            max="${this.max}"
            value1="${this.from}"
            value2="${this.to}"
            step="1"
            keyboard-disabled="true"
          ></tc-range-slider>
        `;

        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add(`range-slider`);
        sliderWrapper.innerHTML = slider;
        this.container.append(sliderWrapper);
        this.subscribe();
    }

    private subscribe() {
        const slider = document.getElementById(`${this.name}`);
        if (slider) {
            slider.addEventListener('onPointerClicked', (e: Event) => {
                if (e instanceof CustomEvent) {
                    this.observer.notify({ eventName: this.eventName, eventPayload: e });
                }
            });
        }
    }
}

export { RangeSliderDual };
