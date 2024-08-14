import { useState, useCallback } from "react";
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

  const { checkIn, checkOut, numberOfGuests, name, phone } = formData;

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

  const validateForm = useCallback(() => {
    return checkIn && checkOut && name && phone && numberOfGuests > 0;
  }, [checkIn, checkOut, name, phone, numberOfGuests]);

  const bookThisPlace = useCallback(async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const numberOfNights = calculateNumberOfNights();
      const response = await axios.post('https://airbnb-backend-tm1o.onrender.com/bookings', {
        checkIn, checkOut, numberOfGuests, name, phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  }, [validateForm, calculateNumberOfNights, checkIn, checkOut, numberOfGuests, name, phone, place]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const numberOfNights = calculateNumberOfNights();

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{formatPrice(place.price)} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <InputField
            label="Check in:"
            type="date"
            name="checkIn"
            value={checkIn}
            onChange={handleInputChange}
          />
          <InputField
            label="Check out:"
            type="date"
            name="checkOut"
            value={checkOut}
            onChange={handleInputChange}
          />
        </div>
        <InputField
          label="Number of guests:"
          type="number"
          name="numberOfGuests"
          value={numberOfGuests}
          onChange={handleInputChange}
        />
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <InputField
              label="Your full name:"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone number:"
              type="tel"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> ₹{formatPrice(numberOfNights * place.price)}</span>
        )}
      </button>
    </div>
  );
}

function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="py-3 px-4">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-2 py-1 mt-1"
      />
    </div>
  );
}
