interface Column {
    column_name: string;
    data_type: string;
}

export interface ITable {
    [key: string]: Column[];
}