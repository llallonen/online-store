export class Validators {
    static isNameValid(name: string): boolean {
        let result = true;
        const processedName = name.trim().split(' ');
        if (processedName.length < 2) {
            return false;
        }
        processedName.forEach((nameItem) => {
            if (nameItem.trim().length < 3) {
                result = false;
            }
            if (!/[a-zA-Z]{3}/g.test(nameItem.trim())) {
                result = false;
            }
        });

        return result;
    }

    static isPhoneValid(phone: string): boolean {
        if (/\s/gm.test(phone)) {
            return false;
        }
        // eslint-disable-next-line no-useless-escape
        if (/^((\+))(\(?\d{3}\)?[\- ]?)?[\d\- ]{9,}$/g.test(phone)) {
            return true;
        } else {
            return false;
        }
    }

    static isAddressValid(address: string): boolean {
        let result = true;
        const processedAddress = address.trim().split(' ');
        if (processedAddress.length < 3) {
            return false;
        }
        processedAddress.forEach((addressItem) => {
            if (addressItem.trim().length < 5) {
                result = false;
            }
        });

        return result;
    }

    static isEmailValid(str: string): boolean {
        return /.+@.+\..+/g.test(str);
    }

    static isCardNumberValid(cardNumber: string): boolean {
        let result = true;
        const proccessedCardNumber = cardNumber.trim().split(' ');
        proccessedCardNumber.forEach((cardNumberItem) => {
            if (cardNumberItem.trim().length !== 4) {
                result = false;
            }
            if (Number.isNaN(Number(cardNumberItem))) {
                result = false;
            }
        });
        if (cardNumber.trim().length !== 19) {
            result = false;
            return result;
        } else {
            return result;
        }
    }

    static isDateCardValid(date: string): boolean {
        const proccessedDate = date.trim().split('/');
        if (
            proccessedDate[0].trim().length !== 2 ||
            Number.isNaN(Number(proccessedDate[0])) ||
            Number(proccessedDate[0].trim()) > 12 ||
            proccessedDate[1].trim().length !== 2 ||
            Number.isNaN(Number(proccessedDate[1]))
        ) {
            return false;
        } else {
            return true;
        }
    }

    static isCCVValid(cvv: string): boolean {
        return cvv.trim().length !== 3 || Number.isNaN(Number(cvv.trim())) ? false : true;
    }
}
