import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import { useBookList, Book } from "../utils/utils";
import EditProduct from "../components/EditProduct";
import ReactPaginate from "react-paginate";

function Favourites() {
  const { toggleFavorite, handleDelete } = useBookList();
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const updateFavouriteBooks = () => {
    // Retrieve bestsellers data from local storage
    const storedBestsellers = localStorage.getItem("bestsellers");
    if (!storedBestsellers) {
      setError("No data in local storage");
      setLoading(false);
      return;
    }

    // Parse the data
    const bestsellers: Book[] = JSON.parse(storedBestsellers);

    // Filter only the books with isFavorite set to true
    const allFavouriteBooks: Book[] = bestsellers.filter(
      (book) => book.isFavorite
    );
    setFavouriteBooks(allFavouriteBooks);
    setLoading(false);
    setShowEditComponent(false);
  };

  const handleEditClose = () => {
    // Call updateFavouriteBooks with the updated data
    updateFavouriteBooks();

    // Additional logic for closing the edit component
    setSelectedProduct(null);
    setShowEditComponent(false);
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    updateFavouriteBooks();
  }, []);

  const renderStars = (rating: number) => {
    const maxRating = 5;
    const starIcons: JSX.Element[] = [];

    for (let i = 1; i <= maxRating; i++) {
      starIcons.push(
        <i
          key={i}
          className={`bi bi-star${i <= rating ? "-fill" : ""}`}
          style={{ color: "gold" }}
        ></i>
      );
    }

    return starIcons;
  };

  const getPaginatedFavouriteBooks = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return favouriteBooks.slice(startIndex, endIndex);
  };

  // Function to open the edit component and pass the selected product
  const openEditComponent = (product: Book) => {
    setSelectedProduct(product);
    setShowEditComponent(true);
  };

  const pageCount = Math.ceil(favouriteBooks.length / itemsPerPage);

  if (showEditComponent) {
    return (
      <>
        <EditProduct
          product={selectedProduct} // Pass the selected product to edit
          onClose={handleEditClose}
        />
        <link rel="stylesheet" type="text/css" href="src/Edit.css" />
      </>
    );
  } else {
    return (
      <div className="gallery-container">
        <div className="row my-4 favourites-lists">
          <div className="col-md-1"></div>
          <div className="col-md-9">
            <ListGroup>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : error ? (
                <p>{error}</p>
              ) : favouriteBooks.length > 0 ? (
                getPaginatedFavouriteBooks().map((product) => (
                  <ListGroup.Item key={product.rank} className="mb-3">
                    <Row className="align-items-center">
                      <Col md={4}>
                        <p className="mb-0">
                          {product.title}
                          <span className="author-name">
                            {" "}
                            by {product.author}
                          </span>
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="mb-0">{product.price} GBP</p>
                      </Col>
                      <Col md={2}>
                        <p className="mb-0">{renderStars(product.rating)}</p>
                      </Col>
                      <Col md={2}>
                        <div className="d-flex">
                          <Button
                            variant="link"
                            aria-label="Edit"
                            className="text-decoration-none text-dark"
                            onClick={() => openEditComponent(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="link"
                            aria-label="Delete"
                            className="text-decoration-none text-dark ms-2"
                            onClick={() => {
                              handleDelete(product.rank, updateFavouriteBooks);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="link"
                          aria-label="Favorite"
                          onClick={(event) => {
                            toggleFavorite(event, product);
                            updateFavouriteBooks();
                          }}
                          style={{ color: "#93B4BC" }}
                        >
                          <i
                            className={`bi ${
                              product.isFavorite ? "bi-heart-fill" : "bi-heart"
                            }`}
                          ></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <p>No favorite elements are present</p>
              )}
            </ListGroup>
            {pageCount > 1 && (
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="pagination justify-content-center"
                activeClassName="active"
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Favourites;
