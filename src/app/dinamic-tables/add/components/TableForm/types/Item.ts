export interface Item {
  key: string;
  columnName: string;
  type: string;
  properties: string;
  existingTables: string;
  relatedTable: string;
  uniqueValue: boolean;
  defaultValue: boolean;
  value: string;
  isNullable: boolean;
  actions: string;
  createdAt: string;
  updatedAt: string;
}
