import { useState, useCallback, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    name: '',
    phone: ''
  });
  const [redirect, setRedirect] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state

  const { checkIn, checkOut, numberOfGuests, name, phone } = formData;

  useEffect(() => {
    const handleLogout = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        setFormData({
          checkIn: '',
          checkOut: '',
          numberOfGuests: 1,
          name: '',
          phone: ''
        });
      }
    };

    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        setIsLoggedIn(false);
        alert("You are not logged in. Please log in to book a place.");
        // Optionally redirect to login page
        // setRedirect('/login');
      }
    };

    window.addEventListener('storage', handleLogout);
    checkAuthentication(); // Check authentication on mount

    return () => window.removeEventListener('storage', handleLogout);
  }, []);

  const calculateNumberOfNights = useCallback(() => {
    if (checkIn && checkOut) {
      return differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    return 0;
  }, [checkIn, checkOut]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Simple validation for Indian phone numbers
    return phoneRegex.test(phone);
  };

  const validateForm = useCallback(() => {
    if (!checkIn) {
      alert("Please select a check-in date.");
      return false;
    }
    if (!checkOut) {
      alert("Please select a check-out date.");
      return false;
    }
    if (new Date(checkIn) > new Date(checkOut)) {
      alert("Check-in date cannot be later than the check-out date.");
      return false;
    }
    if (!name) {
      alert("Please enter your full name.");
      return false;
    }
    if (!phone) {
      alert("Please enter your phone number.");
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (numberOfGuests <= 0) {
      alert("Please enter a valid number of guests.");
      return false;
    }
    return true;
  }, [checkIn, checkOut, name, phone, numberOfGuests]);

  const bookThisPlace = useCallback(async () => {
    if (!isLoggedIn) {
      alert("You are logged out. Please log in again to book a place.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const numberOfNights = calculateNumberOfNights();
      const response = await axios.post('https://airbnb-backend-tm1o.onrender.com/api/bookings', {
        checkIn, checkOut, numberOfGuests, name, phone,
        place: place._id,
        price: numberOfNights * place.price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  }, [validateForm, calculateNumberOfNights, checkIn, checkOut, numberOfGuests, name, phone, place, isLoggedIn]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const numberOfNights = calculateNumberOfNights();

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center text-gray-900 dark:text-gray-100">
        Price: ₹{formatPrice(place.price)} / per night
      </div>
      <div className="border dark:border-gray-700 rounded-2xl mt-4">
        <div className="flex">
          <InputField
            label="Check in:"
            type="date"
            name="checkIn"
            value={checkIn}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Check out:"
            type="date"
            name="checkOut"
            value={checkOut}
            onChange={handleInputChange}
            required
          />
        </div>
        <InputField
          label="Number of guests:"
          type="number"
          name="numberOfGuests"
          value={numberOfGuests}
          onChange={handleInputChange}
          required
        />
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t dark:border-gray-700">
            <InputField
              label="Your full name:"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Phone number:"
              type="tel"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
      </div>
      <button
        onClick={bookThisPlace}
        className="primary mt-4 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-100 px-4 py-2 rounded"
      >
        Book this place
        {numberOfNights > 0 && (
          <span> ₹{formatPrice(numberOfNights * place.price)}</span>
        )}
      </button>
    </div>
  );
}

function InputField({ label, type, name, value, onChange, required }) {
  return (
    <div className="py-3 px-4">
      <label className="text-gray-900 dark:text-gray-100">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border dark:border-gray-700 rounded px-2 py-1 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}
