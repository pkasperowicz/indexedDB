declare module "buffer" {
    declare class Buffer {
        constructor(buffer: ArrayBuffer) : this;
        [key:number]: number;
    }
}