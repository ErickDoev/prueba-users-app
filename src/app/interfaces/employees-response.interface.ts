import { Employee } from './employee.interface';

export interface EmployeesResponse {
    content:          Employee[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    number:           number;
    sort:             Sort;
    size:             number;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
