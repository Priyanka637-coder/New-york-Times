import React from "react";
import { Book } from "../utils/utils";

interface BestsellerGalleryProps {
  bestsellers: Book[];
  loading: boolean;
  error: string | null;
  onChildAction: () => void;
}

const BestsellerGallery: React.FC<BestsellerGalleryProps> = ({
  bestsellers,
  loading,
  error,
  onChildAction,
}) => {
  const handleViewAllClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault(); // Prevent the default link behavior, if needed
    onChildAction();
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="row justify-content-center my-5">
          <div className="col-md-9">
            <p className="m-0 gallery-title">New York Times Bestseller</p>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="row justify-content-center my-5">
          <div className="col-md-9">
            <p className="m-0 gallery-title">New York Times Bestseller</p>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-9 d-flex justify-content-between">
          <p className="m-0 gallery-title">New York Times Bestseller</p>
          <a
            href="/"
            className="small primary-color text-decoration-none"
            onClick={(event: React.MouseEvent) => handleViewAllClick(event)}
          >
            View All
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        {bestsellers.map((book) => (
          <div className="col-md-3 mb-4" key={book.rank}>
            <div className="card ny-cards">
              <img
                src={book.book_image}
                className="card-img-top ny-card-img mt-auto mb-auto"
                alt={book.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestsellerGallery;
