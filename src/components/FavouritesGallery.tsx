import React from "react";
import { Book } from "../utils/utils";
import { Link } from "react-router-dom";

interface FavouritesGalleryProps {
  bestsellers: Book[];
  loading: boolean;
  error: string | null;
  onChildAction: () => void;
}

const FavouritesGallery: React.FC<FavouritesGalleryProps> = ({
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
            <p className="m-0 gallery-title">Favourites</p>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="row justify-content-left my-5">
          <div className="col-md-1"></div>
          <div className="col-md-9">
            <p className="m-0 gallery-title">Favourites</p>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="row justify-content-left  mt-4">
        <div className="col-md-1"></div>
        <div className="col-md-9 d-flex justify-content-between">
          <p className="m-0 gallery-title">Favourites</p>
          <Link
            className="small primary-color text-decoration-none"
            to={{
              pathname: "/favourites",
            }}
          >
            View All
          </Link>
        </div>
      </div>
      <div className="row justify-content-left">
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

export default FavouritesGallery;
