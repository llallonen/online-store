export class Validators {
    static isNameValid(str: string): boolean {
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

    static isPhoneValid(str: string): boolean {
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

    static isAddressValid(str: string): boolean {
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

    static isEmailValid(str: string): boolean {
        if (/.+@.+\..+/g.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    static isCardNumberValid(str: string): boolean {
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

    static dateCardValid(str: string): boolean {
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

    static isCCVValid(str: string): boolean {
        let result = true;

        if (str.trim().length !== 3 || Number.isNaN(Number(str.trim()))) {
            result = false;
            return result;
        } else {
            return result;
        }
    }
}
