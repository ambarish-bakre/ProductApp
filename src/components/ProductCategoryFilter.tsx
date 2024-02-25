import { CategoryType } from "../models/Product";
import { getEnumKeys } from "../utils/utils";

function ProductCategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: CategoryType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
}) {
  return (
    <div className="mb-3 float-end">
      <label htmlFor="productCategoryFilter" className="form-label">
        Filter by product category:
      </label>
      <select
        id="productCategoryFilter"
        className="form-select w-auto"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(
            CategoryType[e.target.value as keyof typeof CategoryType]
          );
        }}
        aria-label="product category filter"
      >
        {getEnumKeys(CategoryType).map((key, index) => (
          <option key={index} value={CategoryType[key]}>
            {CategoryType[key]}
          </option>
        ))}
      </select>
    </div>
  );
}
export default ProductCategoryFilter;
