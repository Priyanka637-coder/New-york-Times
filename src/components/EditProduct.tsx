import React, { useState } from "react";
import { Book } from "../utils/utils";

interface EditProductProps {
  product: Book | null;
  onClose: () => void;
}

function EditProduct({ product, onClose }: EditProductProps) {
  const [rating, setRating] = useState<number>(product ? product.rating : 0); // Set the initial rating based on product.rating

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
  };

  const stars = [1, 2, 3, 4, 5];
  const handleUpdate = () => {
    if (product) {
      // Parse the price value from the input field
      const inputPrice = document.getElementById(
        "price-input"
      ) as HTMLInputElement;
      const inputValue = inputPrice ? inputPrice.value : "";

      // If the input field has a value, remove "GBP" and convert to a number
      const priceWithoutGBP = inputValue
        ? parseFloat(inputValue.replace("GBP", ""))
        : 0;

      // Rest of your code...
      // Update the product's rating and price in local storage
      const storedBestsellers = localStorage.getItem("bestsellers");
      if (storedBestsellers) {
        const bestsellers: Book[] = JSON.parse(storedBestsellers);
        const updatedBestsellers = bestsellers.map((book) => {
          if (book.rank === product.rank) {
            return { ...book, rating, price: priceWithoutGBP };
          }
          return book;
        });
        localStorage.setItem("bestsellers", JSON.stringify(updatedBestsellers));
      }
    }
    onClose();
  };

  if (product === null) {
    return (
      <div className="gallery-container">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="p-5 text-center bg-image Edit-bg-image">
        <div className="mask">
          <div className="d-flex justify-content-center">
            <div className="text-white">
              <h1 className="mb-3">
                {product.title} by {product.author}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-group-container mx-auto my-4">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Edit</label>

            <div className="input-group input-group-lg">
              <span
                className="input-group-text rounded-0 edit-group-label"
                id="inputGroup-sizing-lg"
              >
                Price
              </span>
              <input
                type="text"
                className="form-control rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="Enter price"
                id="price-input"
                defaultValue={
                  product.price
                    ? product.price.toString() + " GBP"
                    : 0.0 + " GBP"
                }
              />
              <span
                className="input-group-text rounded-0"
                id="inputGroup-sizing-lg"
              >
                GBP
              </span>
            </div>

            <div className="input-group input-group-lg mt-5 star-rating-container">
              <span
                className="input-group-text rounded-0 edit-group-label"
                id="inputGroup-sizing-lg"
              >
                Rating
              </span>
              <div className="star-rating px-3">
                {stars.map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? "selected" : ""}`}
                    onClick={() => handleStarClick(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary my-4 btn-md custom-button py-2 px-5"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </div>
        </div>
        <br />
        <a href="/favourites" className="my-5 small text-decoration-none">
          <span className="primary-color">
            <img src="src/assets/arrow.png" alt="arrow" />
          </span>
          <span className="primary-color"> Return to:</span>
          <span className="secondary-color"> Favourites</span>
        </a>
      </div>
    </div>
  );
}

export default EditProduct;
