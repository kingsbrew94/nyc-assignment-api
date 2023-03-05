
export default class ApiResponse<T> {
    private status!: number;
    private message!: string;
    private data!: T;

    public getStatus(): number { return this.status; }
    public setStatus(value: number): void { this.status = value; }

    public getMessage(): string { return this.message; }
    public setMessage(value: string): void { this.message = value; }

    public getData(): T { return this.data; }
    public setData(value: T): void { this.data = value; }
}