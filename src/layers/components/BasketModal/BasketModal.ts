import Observer from '../../Observer/Observer';
import './BasketModal.scss';
import { EventName } from '../../Observer/Observer.types';
import { Validators } from '../../../utils/validators';
import { ICommonProps, TValidationError } from '../../Model/Model.types';
import { createElement } from '../../../utils/createElement';

const fields = [
    {
        input: '.BasketModal__input.name',
        errorBox: '.BasketModal__error.name',
        validator: Validators.isNameValid,
        errorMessage: 'Must contain at least two words, each at least 3 characters long',
    },
    {
        input: '.BasketModal__input.phone',
        errorBox: '.BasketModal__error.phone',
        validator: Validators.isPhoneValid,
        errorMessage: 'Must start with "+", contain only digits and be at least 9 digits',
    },
    {
        input: '.BasketModal__input.address',
        errorBox: '.BasketModal__error.address',
        validator: Validators.isAddressValid,
        errorMessage: 'Must contain at least three words, each at least 5 characters long',
    },
    {
        input: '.BasketModal__input.email',
        errorBox: '.BasketModal__error.email',
        validator: Validators.isEmailValid,
        errorMessage: 'Must be email',
    },
    {
        input: '.BasketModal__cardNumber',
        errorBox: '.BasketModal__cardNumber-error',
        validator: Validators.isCardNumberValid,
        errorMessage: 'The number of entered digits must be exactly 16',
    },
    {
        input: '.BasketModal__valid-input',
        errorBox: '.BasketModal__cardValid-error',
        validator: Validators.dateCardValid,
        errorMessage: 'Please enter a valid date',
    },
    {
        input: '.BasketModal__cvv-input',
        errorBox: '.BasketModal__cardCVV-error',
        validator: Validators.isCCVValid,
        errorMessage: 'Please enter a correct CVV',
    },
];

class BasketModal {
    private container: HTMLElement;
    private observer: Observer;
    constructor({ container, observer }: ICommonProps) {
        this.container = container;
        this.observer = observer;
    }

    public render(): void {
        const modal = `
          <div class="BasketModal__form">
            <div class="BasketModal__form-item">
              <div class="BasketModal__form-header">FirstName and SecondName</div>
              <input class="BasketModal__input name" type='text'/>
              <div class="BasketModal__error name"></div>
            </div>
            <div class="BasketModal__form-item">
              <div class="BasketModal__form-header">Phone</div>
              <input class="BasketModal__input phone" type='text'/>
              <div class="BasketModal__error phone"></div>
            </div>
            <div class="BasketModal__form-item">
              <div class="BasketModal__form-header">Address</div>
              <input class="BasketModal__input address" type='text'/>
              <div class="BasketModal__error address"></div>
            </div>
            <div class="BasketModal__form-item">
              <div class="BasketModal__form-header">Email</div>
              <input class="BasketModal__input email" type='text'/>
              <div class="BasketModal__error email"></div>
            </div>
          </div>
          <div class="BasketModal__card-block">
            <h2 class="BasketModal__card-header">Credit card details</h2>
            <div class="BasketModal__card">
              <div class="BasketModal__firstLine">
                <img class="BasketModal__cardImg" src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71"/>
                <input class="BasketModal__cardNumber"/>
              </div>
              <div class="BasketModal__secondLine">
                <div class="BasketModal__valid">
                  VALID: 
                  <input class="BasketModal__valid-input"/>
                </div>
                <div class="BasketModal__cvv">
                  CVV: 
                  <input class="BasketModal__cvv-input"/>
                </div>
              </div>
            </div>
            <span class="BasketModal__cardNumber-error BasketModal__error"></span>
            <span class="BasketModal__cardValid-error BasketModal__error"></span>
            <span class="BasketModal__cardCVV-error BasketModal__error"></span>
            <button class="BasketModal__button button button-basic">Confirm</button>
          </div>
        `;

        const basketModal = createElement('div', 'BasketModal');

        basketModal.innerHTML = modal;
        this.container.append(basketModal);

        const buttonConfirm = document.querySelector('.BasketModal__button');
        if (buttonConfirm) {
            buttonConfirm.addEventListener('click', () => this.confirm());
        }

        const cardNumberInput: HTMLInputElement | null = document.querySelector('.BasketModal__cardNumber');
        const cardNumberImage: HTMLImageElement | null = document.querySelector('.BasketModal__cardImg');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e: Event) => {
                if (e.target instanceof HTMLInputElement) {
                    const value = e.target.value;
                    const arr = value.split(' ');

                    if (Number.isNaN(Number(arr[arr.length - 1]))) {
                        cardNumberInput.value = `${value.slice(0, -1)}`;
                    }
                    if (cardNumberImage) {
                        if (value[0] === '4') {
                            cardNumberImage.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png`;
                        }

                        if (value[0] === '5') {
                            cardNumberImage.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png`;
                        }

                        if (value[0] === '6') {
                            cardNumberImage.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png`;
                        }

                        if (value[0] !== '4' && value[0] !== '5' && value[0] !== '6') {
                            cardNumberImage.src = `https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71`;
                        }
                    }

                    if (value.length === 4) {
                        cardNumberInput.value = `${value} `;
                    }
                    if (value.length === 9) {
                        cardNumberInput.value = `${value} `;
                    }
                    if (value.length === 14) {
                        cardNumberInput.value = `${value} `;
                    }
                    if (value.length > 19) {
                        cardNumberInput.value = `${value.slice(0, -1)}`;
                    }
                }
            });
        }

        const cardValidInput: HTMLInputElement | null = document.querySelector('.BasketModal__valid-input');
        if (cardValidInput) {
            cardValidInput.addEventListener('input', (e: Event) => {
                if (e.target instanceof HTMLInputElement) {
                    const value = e.target.value;
                    const arr = value.split('/');

                    if (Number.isNaN(Number(arr[arr.length - 1]))) {
                        cardValidInput.value = `${value.slice(0, -1)}`;
                    }

                    if (value.length === 2) {
                        cardValidInput.value = `${value}/`;
                    }

                    if (value.length === 6) {
                        cardValidInput.value = `${value.slice(0, -1)}`;
                    }
                }
            });
        }

        const cardCVVInput: HTMLInputElement | null = document.querySelector('.BasketModal__cvv-input');
        if (cardCVVInput) {
            cardCVVInput.addEventListener('input', (e: Event) => {
                if (e.target instanceof HTMLInputElement) {
                    const value = e.target.value;
                    const arr = value.split(' ');
                    if (Number.isNaN(Number(arr[arr.length - 1]))) {
                        cardCVVInput.value = `${value.slice(0, -1)}`;
                    }

                    if (value.length === 4) {
                        cardCVVInput.value = `${value.slice(0, -1)}`;
                    }
                }
            });
        }
    }

    private confirm(): void {
        const validationStates = fields.reduce((acc, el) => {
            const validator = el.validator;
            const elemForConfirm: HTMLInputElement | null = document.querySelector(`${el.input}`);
            const elemForConfirmError: HTMLInputElement | null = document.querySelector(`${el.errorBox}`);

            if (elemForConfirm && elemForConfirmError) {
                const value = elemForConfirm.value;

                if (validator(value)) {
                    acc.push(true);
                } else {
                    acc.push({
                        errorNode: elemForConfirmError,
                        errorText: el.errorMessage,
                    });
                }

                return acc;
            }
            return acc;
        }, [] as (true | TValidationError)[]);

        const hasErrors = !!validationStates.find((el) => typeof el === 'object');

        const canConfirm = !hasErrors;

        fields.forEach((field) => {
            const errorBox: HTMLInputElement | null = document.querySelector(`${field.errorBox}`);
            if (errorBox) {
                errorBox.textContent = '';
            }
        });

        if (hasErrors) {
            const errors = validationStates.filter((el): el is TValidationError => typeof el === 'object');

            errors.forEach((error) => {
                error.errorNode.textContent = error.errorText;
            });
        }

        if (canConfirm) {
            const modal = document.querySelector('.basket__modal.active');
            const successWindow = document.querySelector('.basket__success');
            modal?.classList.toggle('active');
            successWindow?.classList.toggle('active');
            setTimeout((e: Event) => {
                window.location.href = '#/';
                this.observer.notify({ eventName: EventName.setModalOpen, eventPayload: e });
                this.observer.notify({ eventName: EventName.clearBasket, eventPayload: e });
            }, 3000);
        }
    }
}

export { BasketModal };
