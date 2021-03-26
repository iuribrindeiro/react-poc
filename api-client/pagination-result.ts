export class PaginationResult<T> {
    items: T[]
    count: number

    constructor(data: any = {}) {
        this.items = data.items || [];
        this.count = data.count || 0;
    }
}