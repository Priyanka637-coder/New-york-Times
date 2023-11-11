import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BestsellerGallery from "../components/BestsellerGallery";
import FavouritesGallery from "../components/FavouritesGallery";
import { fetchBestsellersAPI } from "../api/api";
import { Book } from "../utils/utils";
import Bestseller from "./Bestseller";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);
  const [bestsellers, setBestsellers] = useState<Book[]>([]);
  const [top3Bestsellers, settop3Bestsellers] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favError, favSetError] = useState<string | null>(null);
  const [top3favourite, settop3favourite] = useState<Book[]>([]);
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
  const handleChildAction = () => {
    setShowAll(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Book[] = await fetchBestsellersAPI();
        //console.log(data);
        // Modify the data to add isFavorite and rating properties
        const modifiedData = data.map((item) => ({
          ...item,
          isFavorite: false,
          rating: 0,
        }));
        console.log(modifiedData);
        // Limit the results to the top 3
        const top3Bestsellers = modifiedData.slice(0, 3);

        // Store the bestsellers data in local storage
        localStorage.setItem("bestsellers", JSON.stringify(modifiedData));

        settop3Bestsellers(top3Bestsellers);
        setBestsellers(modifiedData);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };

    // Check if the data is already in local storage
    const storedBestsellers = localStorage.getItem("bestsellers");
    if (storedBestsellers) {
      const parsedBestsellers = JSON.parse(storedBestsellers);
      if (parsedBestsellers.length > 0) {
        const parsedBestsellers = JSON.parse(storedBestsellers);
        console.log(parsedBestsellers);
        settop3Bestsellers(parsedBestsellers.slice(0, 3));
        setBestsellers(parsedBestsellers);
        setLoading(false);
        // Filter only the books with isFavorite set to true
        const favourites: Book[] = parsedBestsellers.filter(
          (book: Book) => book.isFavorite
        );
        if (favourites.length === 0) {
          favSetError("No favorite elements are present");
        } else {
          // Set the top 3 favorites
          const top3Favourites =
            favourites.length > 3 ? favourites.slice(0, 3) : favourites;
          settop3favourite(top3Favourites);
        }
      } else {
        fetchData(); // Fetch the data if not in local storage
      }
    } else {
      fetchData(); // Fetch the data if not in local storage
    }
  }, []);

  useEffect(() => {
    // Listen for route changes and reset showAll if the route changes to "/"
    if (location.pathname === "/") {
      setShowAll(false);
    }
  }, [location]);

  return (
    <div className="my-4">
      {!showAll ? (
        <>
          <BestsellerGallery
            onChildAction={handleChildAction}
            bestsellers={top3Bestsellers}
            loading={loading}
            error={error}
          />
          <FavouritesGallery
            onChildAction={handleChildAction}
            bestsellers={top3favourite}
            loading={loading}
            error={favError}
          />
        </>
      ) : (
        <Bestseller bestsellers={bestsellers} loading={loading} error={error} />
      )}
    </div>
  );
}

export default Home;
