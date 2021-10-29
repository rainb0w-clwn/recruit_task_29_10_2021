export interface ObjectLiteralInterface {
    [s: string]: any;
}

export interface IPaginationMetaInterface extends ObjectLiteralInterface {
    pageSize: number;
    itemCount: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export type PaginationInterface<PaginationObject, T extends ObjectLiteralInterface = IPaginationMetaInterface> = {
    readonly data: PaginationObject[];
    readonly meta: T;
};

export type PaginationMeta = IPaginationMetaInterface;
