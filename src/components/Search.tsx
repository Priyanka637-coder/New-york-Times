import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function Search() {
  return (
    <div className="gallery-container">
      <div className="row my-4">
        <div className="col-md-1"></div>
        <div className="col-md-8 mb-3">
          <form>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="What books would you like to find?"
                aria-label="What books would you like to find?"
                aria-describedby="basic-addon2"
                className="search-input"
              />
              <Button
                variant="outline-secondary"
                id="basic-addon2"
                type="submit"
              >
                Go
              </Button>
            </InputGroup>
          </form>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default Search;
