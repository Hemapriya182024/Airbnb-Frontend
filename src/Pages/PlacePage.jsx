import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`https://airbnb-backend-tm1o.onrender.com/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 dark:bg-gray-900 -mx-8 px-8 pt-8">
      <h1 className="text-3xl text-gray-900 dark:text-white">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{place.description}</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Check-in: {place.checkIn}<br />
            Check-out: {place.checkOut}<br />
            Max number of guests: {place.maxGuests}
          </p>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 -mx-8 px-8 py-8 border-t dark:border-gray-700">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 dark:text-gray-300 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  );
}
