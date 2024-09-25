'use client'
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";


const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Check if the property is already bookmarked
    const fetchBookmarkStatus = async () => {
      try {
        const res = await checkBookmarkStatus(property._id);
        if (res.error) {
          toast.error(res.error);
        } else {
          setIsBookmarked(res.isAlreadyBookmarked);
        }
      } catch (error) {
        toast.error("Failed to check bookmark status.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be logged in to bookmark that.");
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      if (res.error) {
        toast.error(res.error);
      } else {
        setIsBookmarked(res.isBookmark);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Failed to update bookmark status.");
    }
  };

  if (loading) {
    return <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded-full w-full">Loading...</button>;
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
