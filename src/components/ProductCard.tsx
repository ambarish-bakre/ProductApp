import { Product } from "../models/Product";

function ProductCard({
  product,
  deleteProduct,
  editButtonHandler,
}: {
  product: Product;
  deleteProduct: () => void;
  editButtonHandler: () => void;
}) {
  return (
    <div className="col-sm-3">
      <div
        className={"card h-100" + (product.isSpecial && " border-warning")}
      >
        <div className="card-body">
          <h5 className="card-title">{product.description}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{product.category}</li>
            <li className="list-group-item">{product.price} Rs</li>
            <li className="list-group-item">
              <small>
                {product.canExpire
                  ? `Expires on ${product.expiryDate?.toLocaleDateString()}`
                  : "No expiry"}
              </small>
            </li>
          </ul>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={editButtonHandler}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
