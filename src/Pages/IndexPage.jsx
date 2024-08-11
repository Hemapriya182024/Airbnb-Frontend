import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} key={place._id} className="group block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-60">
            {place.photos?.[0] && (
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                src={place.photos[0]}
                alt={place.title}
              />
            )}
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg mb-1 group-hover:text-blue-600">{place.address}</h2>
            <h3 className="text-sm text-gray-600 mb-2">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold text-xl">${place.price}</span> <span className="text-sm text-gray-500">per night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
