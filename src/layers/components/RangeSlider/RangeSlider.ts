import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IRangeSliderProps, RangeSliderType } from './RangeSlider.types';
import 'toolcool-range-slider';

class RangeSlider {
    private container: HTMLElement;
    private observer: Observer;
    private name: string;
    private from: number;
    private to: number;
    private min: number;
    private max: number;
    private type: RangeSliderType;
    constructor({ container, observer, name, from, max, min, to, type }: IRangeSliderProps) {
        this.container = container;
        this.observer = observer;
        this.name = name;
        this.from = from;
        this.to = to;
        this.min = min;
        this.max = max;
        this.type = type;
    }

    public render() {
        const slider = `
          <tc-range-slider 
            id="${this.name}"
            min="${this.min}"
            max="${this.max}"
            value1="${this.from}"
            value2="${this.to}"
            max="${this.max}"
            step="1"
          ></tc-range-slider>
        `;

        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add(`range-slider`);
        sliderWrapper.innerHTML = slider;
        this.container.append(sliderWrapper);
        this.subscribe();
    }

    private subscribe() {
        const slider = document.getElementById(this.name);
        if (slider) {
            slider.addEventListener('onMouseUp', (e: Event) => {
                if (e instanceof CustomEvent) {
                    if (this.type === RangeSliderType.price) {
                        this.observer.notify({ eventName: EventName.filterPrice, eventPayload: e });
                    }
                    if (this.type === RangeSliderType.stock) {
                        this.observer.notify({ eventName: EventName.filterStock, eventPayload: e });
                    }
                }
            });
        }
    }
}

export { RangeSlider };
