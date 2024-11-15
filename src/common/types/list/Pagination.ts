import { Pagination } from "react-bootstrap";

export interface Pagination{
    page: number,
    pageSize: number,
    totalItems?: number,
    totalPages?: number,
}

export const defaultPagination = (): Pagination => {
    return {
        page: 1,
        pageSize: 10
    }
}