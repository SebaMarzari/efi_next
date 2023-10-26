export interface Item {
  key: string;
  columnName: string;
  type: string;
  properties: number;
  existingTables: string;
  relatedTable: string;
  uniqueValue: boolean;
  defaultValue: boolean;
  isNullable: boolean;
  actions: string;
  createdAt: string;
  updatedAt: string;
}
