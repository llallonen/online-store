import Observer from '../../Observer/Observer';
import { IBasketModalProps } from './BasketModal.types';
import './BasketModal.scss';
import { EventName } from '../../Observer/Observer.types';

class BasketModal {
    private container: HTMLElement;
    private observer: Observer;
    constructor({ container, observer }: IBasketModalProps) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
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

        const basketModal = document.createElement('div');
        basketModal.classList.add('BasketModal');

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

    private isNameValid(str: string) {
        let result = true;
        const arr = str.trim().split(' ');
        if (arr.length < 2) {
            return false;
        }
        arr.forEach((el) => {
            if (el.trim().length < 3) {
                result = false;
            }
            if (!/[a-zA-Z]{3}/g.test(el.trim())) {
                result = false;
            }
        });

        return result;
    }

    private isPhoneValid(str: string) {
        if (/\s/gm.test(str)) {
            return false;
        }
        // eslint-disable-next-line no-useless-escape
        if (/^((\+))(\(?\d{3}\)?[\- ]?)?[\d\- ]{9,}$/g.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    private isAddressValid(str: string) {
        let result = true;
        const arr = str.trim().split(' ');
        if (arr.length < 3) {
            return false;
        }
        arr.forEach((el) => {
            if (el.trim().length < 5) {
                result = false;
            }
        });

        return result;
    }

    private isEmailValid(str: string) {
        if (/.+@.+\..+/g.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    private isCardNumberValid(str: string) {
        let result = true;
        const arr = str.trim().split(' ');
        arr.forEach((el) => {
            if (el.trim().length !== 4) {
                result = false;
            }
            if (Number.isNaN(Number(el))) {
                result = false;
            }
        });
        if (str.trim().length !== 19) {
            result = false;
            return result;
        } else {
            return result;
        }
    }

    private dateCardValid(str: string) {
        const arr = str.trim().split('/');
        if (
            arr[0].trim().length !== 2 ||
            Number.isNaN(Number(arr[0])) ||
            Number(arr[0].trim()) > 12 ||
            arr[1].trim().length !== 2 ||
            Number.isNaN(Number(arr[1]))
        ) {
            return false;
        } else {
            return true;
        }
    }

    private isCCVValid(str: string) {
        let result = true;

        if (str.trim().length !== 3 || Number.isNaN(Number(str.trim()))) {
            result = false;
            return result;
        } else {
            return result;
        }
    }

    private confirm() {
        let confirm = true;
        const basketModalName: HTMLInputElement | null = document.querySelector('.BasketModal__input.name');
        const basketModalNameError = document.querySelector('.BasketModal__error.name');
        if (basketModalName && basketModalNameError) {
            const value = basketModalName.value;
            if (!this.isNameValid(value)) {
                confirm = false;
                basketModalNameError.textContent = `Must contains at least two words, each at least 3 characters long`;
            } else {
                basketModalNameError.textContent = ``;
            }
        }

        const basketModalPhone: HTMLInputElement | null = document.querySelector('.BasketModal__input.phone');
        const basketModalPhoneError = document.querySelector('.BasketModal__error.phone');
        if (basketModalPhone && basketModalPhoneError) {
            const value = basketModalPhone.value;
            if (!this.isPhoneValid(value)) {
                confirm = false;
                basketModalPhoneError.textContent = `Must start with '+', contain only digits and be at least 9 digits`;
            } else {
                basketModalPhoneError.textContent = ``;
            }
        }

        const basketModalAddress: HTMLInputElement | null = document.querySelector('.BasketModal__input.address');
        const basketModalAddressError = document.querySelector('.BasketModal__error.address');
        if (basketModalAddress && basketModalAddressError) {
            const value = basketModalAddress.value;
            if (!this.isAddressValid(value)) {
                confirm = false;
                basketModalAddressError.textContent = `Must contains at least three words, each at least 5 characters long`;
            } else {
                basketModalAddressError.textContent = ``;
            }
        }

        const basketModalEmail: HTMLInputElement | null = document.querySelector('.BasketModal__input.email');
        const basketModalEmailError = document.querySelector('.BasketModal__error.email');
        if (basketModalEmail && basketModalEmailError) {
            const value = basketModalEmail.value;
            if (!this.isEmailValid(value)) {
                confirm = false;
                basketModalEmailError.textContent = `Must be email`;
            } else {
                basketModalEmailError.textContent = ``;
            }
        }

        const basketModalCardNumber: HTMLInputElement | null = document.querySelector('.BasketModal__cardNumber');
        const basketModalCardNumberError = document.querySelector('.BasketModal__cardNumber-error');
        if (basketModalCardNumber && basketModalCardNumberError) {
            const value = basketModalCardNumber.value;
            if (!this.isCardNumberValid(value)) {
                confirm = false;
                basketModalCardNumberError.textContent = `The number of entered digits must be exactly 16`;
            } else {
                basketModalCardNumberError.textContent = ``;
            }
        }

        const basketModalValid: HTMLInputElement | null = document.querySelector('.BasketModal__valid-input');
        const basketModalValidError = document.querySelector('.BasketModal__cardValid-error');
        if (basketModalValid && basketModalValidError) {
            const value = basketModalValid.value;
            if (!this.dateCardValid(value)) {
                confirm = false;
                basketModalValidError.textContent = `Please enter a valid date`;
            } else {
                basketModalValidError.textContent = ``;
            }
        }

        const basketModalCVV: HTMLInputElement | null = document.querySelector('.BasketModal__cvv-input');
        const basketModalCVVError = document.querySelector('.BasketModal__cardCVV-error');
        if (basketModalCVV && basketModalCVVError) {
            const value = basketModalCVV.value;
            if (!this.isCCVValid(value)) {
                confirm = false;
                basketModalCVVError.textContent = `Please enter a correct CVV`;
            } else {
                basketModalCVVError.textContent = ``;
            }
        }

        if (confirm) {
            const modal = document.querySelector('.basket__modal.active');
            modal?.classList.toggle('active');
            const successWindow = document.querySelector('.basket__success');
            successWindow?.classList.toggle('active');
            setTimeout((e: Event) => {
                window.location.href = '#/';
                this.observer.notify({ eventName: EventName.clearBasket, eventPayload: e });
            }, 3000);
        }
    }
}

export { BasketModal };
