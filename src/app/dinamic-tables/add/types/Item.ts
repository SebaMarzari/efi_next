export interface Item {
  key: string;
  columnName: string;
  type: string;
  characterQty: number;
  existingTables: string;
  relatedTable: string;
  uniqueValue: boolean;
  defaultValue: boolean;
  actions: string;
  createdAt: string;
  updatedAt: string;
}
