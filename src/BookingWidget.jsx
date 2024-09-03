import { useState, useCallback, useEffect, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from './UseContext';

const BookingWidget = ({ place }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    name: '',
    phone: ''
  });
  const [redirect, setRedirect] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Consider updating this based on actual login status
  const { user } = useContext(UserContext);

  const { checkIn, checkOut, numberOfGuests, name, phone } = formData;
  const today = new Date().toISOString().split('T')[0];
  const nextYearEnd = `${new Date().getFullYear() + 1}-12-31`;

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({ ...prevData, name: user.name }));
    }
  }, [user]);

  const calculateNumberOfNights = useCallback(() => {
    return checkIn && checkOut ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) : 0;
  }, [checkIn, checkOut]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const validatePhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

  const validateForm = useCallback(() => {
    if (!checkIn || !checkOut || new Date(checkIn) > new Date(checkOut)) {
      alert("Invalid dates.");
      return false;
    }
    if (!name || !phone || !validatePhoneNumber(phone) || numberOfGuests <= 0) {
      alert("Invalid input.");
      return false;
    }
    return true;
  }, [checkIn, checkOut, name, phone, numberOfGuests]);

  const bookThisPlace = useCallback(async () => {
    if (!isLoggedIn) {
      alert("You are logged out. Please log in again.");
      return;
    }

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const numberOfNights = calculateNumberOfNights();
      const response = await axios.post('https://airbnb-backend-tm1o.onrender.com/bookings', {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRedirect(`/account/bookings/${response.data._id}`);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  }, [validateForm, calculateNumberOfNights, checkIn, checkOut, numberOfGuests, name, phone, place, isLoggedIn]);

  if (redirect) return <Navigate to={redirect} />;

  const numberOfNights = calculateNumberOfNights();
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center text-gray-900 dark:text-gray-100">
        Price: ₹{new Intl.NumberFormat('en-IN').format(place.price)} / per night
      </div>
      <div className="border dark:border-gray-700 rounded-2xl mt-4">
        <div className="flex">
          <InputField label="Check in:" type="date" name="checkIn" value={checkIn} onChange={handleInputChange} required min={today} max={nextYearEnd} />
          <InputField label="Check out:" type="date" name="checkOut" value={checkOut} onChange={handleInputChange} required min={checkIn || today} max={nextYearEnd} />
        </div>
        <InputField label="Number of guests:" type="number" name="numberOfGuests" value={numberOfGuests} onChange={handleInputChange} required />
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t dark:border-gray-700">
            <InputField label="Your full name:" type="text" name="name" value={name} onChange={handleInputChange} required />
            <InputField label="Phone number:" type="tel" name="phone" value={phone} onChange={handleInputChange} required />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-100 px-4 py-2 rounded">
        Book this place {numberOfNights > 0 && `₹${new Intl.NumberFormat('en-IN').format(numberOfNights * place.price)}`}
      </button>
    </div>
  );
};

const InputField = ({ label, type, name, value, onChange, required, min, max }) => (
  <div className="py-3 px-4">
    <label className="text-gray-900 dark:text-gray-100">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      className="w-full border dark:border-gray-700 rounded px-2 py-1 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  </div>
);

export default BookingWidget;
