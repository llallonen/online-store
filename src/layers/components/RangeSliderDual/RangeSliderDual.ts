import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IRangeSliderProps } from './RangeSliderDual.types';
import 'toolcool-range-slider';
import './RangeSliderDual.scss';

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

    public render(): void {
        const slider = `
        <div class="RangeSlider__counters" id="${this.name}-counters">
            <span class="RangeSlider__counter-from">${this.from}</span><span class="RangeSlider__counter-to">${this.to}</span>
        </div>
          <tc-range-slider 
            id="${this.name}"
            min="${this.min}"
            max="${this.max}"
            value1="${this.from}"
            value2="${this.to}"
            step="1"
            keyboard-disabled="true"
            pointer1-width="10px"
            pointer1-height="10px"
            pointer2-width="15px"
            pointer2-height="15px"
            pointer-bg="#d4d3d3"
            slider-bg-fill="#7b647b"
          ></tc-range-slider>
        `;

        const sliderContent = document.createElement('div');
        sliderContent.classList.add(`RangeSlider-${this.name}`);
        sliderContent.innerHTML = slider;

        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add(`RangeSlider`);
        sliderWrapper.append(sliderContent);

        this.container.append(sliderWrapper);
        this.subscribe();
    }

    private subscribe(): void {
        const slider = document.getElementById(`${this.name}`);
        const ad = document.querySelector(`.RangeSlider-${this.name}`);
        if (slider) {
            slider.addEventListener('change', (e: Event) => {
                if (e instanceof CustomEvent) {
                    if (!Number.isNaN(e.detail.values[0]) && !Number.isNaN(e.detail.values[1])) {
                        if (ad) {
                            ad.addEventListener('mouseup', () => {
                                this.observer.notify({ eventName: this.eventName, eventPayload: e });
                            });
                        }
                        this.updateCounter(e.detail.values[0], e.detail.values[1]);
                    }
                }
            });
        }
    }

    private updateCounter(from: number, to: number): void {
        const sliderNode = document.getElementById(`${this.name}-counters`);
        const fromNode = sliderNode?.querySelector('.RangeSlider__counter-from');
        const toNode = sliderNode?.querySelector('.RangeSlider__counter-to');
        if (fromNode) {
            fromNode.textContent = `${from}`;
        }

        if (toNode) {
            toNode.textContent = `${to}`;
        }
    }
}

export { RangeSliderDual };
