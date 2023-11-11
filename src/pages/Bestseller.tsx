import React, { useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate"; // Import the pagination component
import { useBookList, Book } from "../utils/utils";

interface BestsellerProps {
  bestsellers: Book[];
  loading: boolean;
  error: string | null;
}

function Bestseller({ bestsellers, loading, error }: BestsellerProps) {
  const { toggleFavorite } = useBookList();
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0); // Current page index

  const renderStars = (rating: number) => {
    const maxRating = 5;
    const starIcons = [];

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

  // Calculate the range of items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedItems = bestsellers.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(bestsellers.length / itemsPerPage);
  return (
    <div className="gallery-container">
      <div className="row favourites-lists">
        <div className="col-md-1"></div>
        <div className="col-md-9">
          <ListGroup>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              displayedItems.map((product) => (
                <ListGroup.Item key={product.rank} className="mb-3">
                  <Row className="align-items-center">
                    <Col md={7}>
                      <p className="mb-0">
                        {product.title}
                        <span className="author-name">
                          {" "}
                          by {product.author}
                        </span>
                      </p>
                    </Col>
                    <Col md={2}>
                      <p className="mb-0">{renderStars(product.rating)}</p>
                    </Col>
                    <Col md={2}>
                      <p className="mb-0">{product.price} GBP</p>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="link"
                        aria-label="Favorite"
                        onClick={(event) => toggleFavorite(event, product)}
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
            )}
          </ListGroup>

          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination justify-content-center"
              // @ts-ignore
              subContainerClassName="pages pagination"
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

export default Bestseller;
