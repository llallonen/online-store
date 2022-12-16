import { IModelProps } from './Model.types';

class Model {
    private counter: number;
    constructor(options: IModelProps) {
        this.counter = options.counter;
    }
}

export { Model };
