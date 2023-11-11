import { useEffect } from "react";

export interface Book {
  rank: number;
  title: string;
  primary_isbn10: string;
  book_image: string;
  price: number;
  author: string;
  rating: number;
  isFavorite: boolean;
}

export function useBookList() {
  const toggleFavorite = (
    event: React.MouseEvent<Element, MouseEvent>,
    book: Book
  ) => {
    // Find the parent button element
    const button = event.currentTarget as HTMLButtonElement;

    // Find the child icon element within the button
    const heartIcon = button.querySelector("i.bi");

    // Toggle the class of the heartIcon
    if (heartIcon) {
      heartIcon.classList.toggle("bi-heart-fill");
      heartIcon.classList.toggle("bi-heart");
    }

    // Toggle the isFavorite property of the selected book or add it if not present
    const storedBookList = JSON.parse(
      localStorage.getItem("bestsellers") || "[]"
    ) as Book[];
    const updatedBookList = storedBookList.map((item: Book) =>
      item.rank === book.rank
        ? { ...item, isFavorite: !item.isFavorite || false }
        : item
    );

    localStorage.setItem("bestsellers", JSON.stringify(updatedBookList));
  };

  const handleDelete = (rank: number, updateFavouriteBooks: () => void) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      const storedBookList = JSON.parse(
        localStorage.getItem("bestsellers") || "[]"
      ) as Book[];
      const updatedBestsellers = storedBookList.filter(
        (book) => book.rank !== rank
      );

      // Update local storage to reflect the changes
      localStorage.setItem("bestsellers", JSON.stringify(updatedBestsellers));

      // Call the updateFavouriteBooks function to refresh the component
      updateFavouriteBooks();
    }
  };
  return { toggleFavorite, handleDelete };
}
