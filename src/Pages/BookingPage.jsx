import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDate";
import AccountNavigation from "../AccountNavigation";
import { UserContext } from "../UseContext";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(UserContext);  
  useEffect(() => {
    if (id && user) {
      axios.get('https://airbnb-backend-tm1o.onrender.com/api/bookings',{
        withCredentials: true
      }).then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id,user]);
  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <AccountNavigation />
      <h1 className="text-3xl text-gray-900 dark:text-white">{booking.place.title}</h1>
      <AddressLink className="my-2 block text-gray-700 dark:text-gray-300">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 dark:bg-gray-800 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary dark:bg-primary-dark p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
