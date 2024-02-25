import { CategoryType, Product } from "../models/Product";
import ProductCard from "./ProductCard";

function ProductListGroup({
  products,
  selectedCategory,
  deleteProduct,
  editButtonHandler,
}: {
  products: Array<Product>;
  selectedCategory: CategoryType;
  deleteProduct: (index: string) => void;
  editButtonHandler: (product: Product) => void;
}) {
  let productsToDisplay: Array<Product>;
  if (selectedCategory === CategoryType.All) {
    productsToDisplay = products;
  } else {
    productsToDisplay = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  return (
    <div className="row">
      {productsToDisplay.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          deleteProduct={() => deleteProduct(product.id)}
          editButtonHandler={() => editButtonHandler(product)}
        ></ProductCard>
      ))}
    </div>
  );
}

export default ProductListGroup;
