import * as bootstrap from "bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CategoryType, FormMode, Product } from "../models/Product";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductForm from "./ProductForm";
import ProductListGroup from "./ProductListGroup";

function ProductContainer() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    CategoryType.All
  );
  const productTemplate = {
    id: uuidv4(),
    description: "",
    canExpire: false,
    expiryDate: null,
    category: CategoryType.All,
    isSpecial: false,
    price: 0,
  };
  const [initialProduct, setInitialProduct] =
    useState<Product>(productTemplate);

  const [products, setProducts] = useState<Array<Product>>([
    {
      id: uuidv4(),
      description: "Tomato",
      canExpire: true,
      expiryDate: new Date(2024, 1, 24),
      category: CategoryType.Vegetable,
      isSpecial: true,
      price: 80,
    },
    {
      id: uuidv4(),
      description: "Chicken",
      canExpire: true,
      expiryDate: new Date(2024, 2, 24),
      category: CategoryType.Meat,
      isSpecial: true,
      price: 100,
    },
    {
      id: uuidv4(),
      description: "Chair",
      canExpire: false,
      expiryDate: null,
      category: CategoryType.Furniture,
      isSpecial: false,
      price: 499,
    },
  ]);
  const [formMode, setFormMode] = useState<FormMode>(FormMode.Add);

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((v) => id !== v.id));
  };

  const openEditProductModal = (product: Product) => {
    setInitialProduct({ ...product });
    setFormMode(FormMode.Edit);
    openProductModal();
  };

  const onEditProductSave = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    closeProductModal();
  };
  const onAddProductSave = (product: Product) => {
    setProducts([...products, product]);
    closeProductModal();
  };

  const openAddProductModal = () => {
    setInitialProduct({ ...productTemplate, id: uuidv4() });
    setFormMode(FormMode.Add);
    openProductModal();
  };

  const openProductModal = () => {
    const modal = bootstrap.Modal.getOrCreateInstance("#productFormModal", {});
    modal.show();
  };
  const closeProductModal = () => {
    const modal = bootstrap.Modal.getOrCreateInstance("#productFormModal", {});
    modal.hide();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex align-items-center">
          <button type="button" className="btn btn-primary align-middle" onClick={openAddProductModal}>
            Add product
          </button>
        </div>
        <div className="col">
          <ProductCategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></ProductCategoryFilter>
        </div>
      </div>

      <ProductListGroup
        products={products}
        deleteProduct={deleteProduct}
        selectedCategory={selectedCategory}
        editButtonHandler={openEditProductModal}
      ></ProductListGroup>

      <ProductForm
        mode={formMode}
        initialProduct={initialProduct}
        setInitialProduct={setInitialProduct}
        onEditProductSave={onEditProductSave}
        onAddProductSave={onAddProductSave}
      ></ProductForm>
    </div>
  );
}

export default ProductContainer;
