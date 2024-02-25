import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { CategoryType, FormMode, Product } from "../models/Product";
import { getEnumKeys } from "../utils/utils";

function ProductForm({
  mode,
  initialProduct,
  setInitialProduct,
  onEditProductSave,
  onAddProductSave,
}: {
  mode: FormMode;
  initialProduct: Product;
  setInitialProduct: React.Dispatch<React.SetStateAction<Product>>;
  onEditProductSave: (product: Product) => void;
  onAddProductSave: (product: Product) => void;
}) {
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialProduct({
      ...initialProduct,
      description: e.target.value,
    });
  };
  const handleCanExpireChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialProduct({
      ...initialProduct,
      canExpire: e.target.checked,
    });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInitialProduct({
      ...initialProduct,
      category: CategoryType[e.target.value as keyof typeof CategoryType],
    });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialProduct({
      ...initialProduct,
      price: e.target.valueAsNumber,
    });
  };
  const handleIsSpecialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialProduct({
      ...initialProduct,
      isSpecial: e.target.checked,
    });
  };
  return (
    <div
      className="modal fade"
      id="productFormModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {
                mode == null ? "Add new product" : "Editing product " //+ initialProduct.id
              }
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Description
                </label>
                <input
                  id="productDescription"
                  type="text"
                  className="form-control"
                  value={initialProduct.description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="mb-3 form-check form-switch">
                <label htmlFor="productCanExpire" className="form-label">
                  Can expire?
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="productCanExpire"
                  checked={initialProduct.canExpire}
                  onChange={handleCanExpireChange}
                ></input>
              </div>
              {initialProduct.canExpire && (
                <div className="mb-3">
                  <label htmlFor="productExpiryDate" className="form-label">
                    Expiry date
                  </label>
                  <DatePicker
                    id="productExpiryDate"
                    selected={initialProduct.expiryDate}
                    wrapperClassName="form-control"
                    className="form-control"
                    onChange={(date: Date) =>
                      setInitialProduct({ ...initialProduct, expiryDate: date })
                    }
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="productCategoryFilter" className="form-label">
                  Category
                </label>
                <select
                  id="productCategoryFilter"
                  className="form-select"
                  value={initialProduct.category}
                  onChange={handleCategoryChange}
                  aria-label="product category filter"
                >
                  {getEnumKeys(CategoryType)
                    .filter((k) => k !== CategoryType.All)
                    .map((key, index) => (
                      <option key={index} value={CategoryType[key]}>
                        {CategoryType[key]}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Price
                </label>
                <input
                  id="productPrice"
                  type="number"
                  className="form-control"
                  value={initialProduct.price}
                  onChange={handlePriceChange}
                />
              </div>
              <div className="mb-3 form-check form-switch">
                <label htmlFor="productIsSpecial" className="form-label">
                  Special product
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="productIsSpecial"
                  checked={initialProduct.isSpecial}
                  onChange={handleIsSpecialChange}
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                mode === FormMode.Add
                  ? onAddProductSave(initialProduct)
                  : onEditProductSave(initialProduct);
              }}
            >
              {mode === FormMode.Add ? "Add" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
