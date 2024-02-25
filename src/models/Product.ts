export enum CategoryType {
  All = "All",
  Vegetable = "Vegetable",
  Meat = "Meat",
  Furniture = "Furniture",
}

export type Product = {
  id: string;
  description: string;
  canExpire: boolean;
  expiryDate: Date | null;
  category: CategoryType;
  price: number;
  isSpecial: boolean;
};

export enum FormMode {
  Edit,
  Add,
}
