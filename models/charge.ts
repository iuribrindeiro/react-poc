export default class Charge {
    description: string;
    amount: number;
    _id: string;

    constructor(data: any = {}) {
        this.description = data.description || "";
        this.amount = parseFloat(data.amount) || 0;
        this._id = data._id || "";
    }
}