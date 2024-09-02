import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImage";
import BookingDates from "../BookingDate";
import AccountNavigation from '../AccountNavigation';
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://airbnb-backend-tm1o.onrender.com/api/bookings', {
      withCredentials: true
    })
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 dark:bg-gray-800">
        <img src="/pulse.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 dark:text-red-300 p-6">{error}</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <AccountNavigation />
      <div className="p-4">
        {bookings?.length > 0 ? (
          bookings.map(booking => (
            <Link 
              to={`/account/bookings/${booking._id}`} 
              key={booking._id} 
              className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md dark:shadow-lg mb-4"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{booking.place.title}</h2>
                <div className="text-xl text-gray-700 dark:text-gray-300">
                  <BookingDates booking={booking} className="mb-2 mt-4" />
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-2xl font-medium">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl">
              <div className="mb-4">
                <video
                  src="https://i.gifer.com/C2K.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-40 h-40 mx-auto"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">No bookings found</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">You have no bookings at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
