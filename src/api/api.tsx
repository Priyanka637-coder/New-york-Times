import React from "react";

const API_KEY = import.meta.env
  .VITE_REACT_APP_NEWYORKTIMES_BESTSELLER_API_KEY as string;

export const fetchBestsellersAPI = async () => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results.books;
  } catch (error) {
    console.error("Error fetching bestsellers:", error);
    throw error;
  }
};
