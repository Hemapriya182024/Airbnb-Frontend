import PhotosUploader from '../PhotosUploder.jsx'
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNavigation from '../AccountNavigation.jsx'
import { Navigate, useParams } from "react-router-dom";


export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`https://airbnb-backend-tm1o.onrender.com/api/places/${id}`, { withCredentials: true }).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('https://airbnb-backend-tm1o.onrender.com/api/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('https://airbnb-backend-tm1o.onrender.com/api/places', placeData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNavigation />
      <div className="form-container relative">
        <div className="overlay">
          <p className="overlay-text">Development Only - For Airbnb Admins or Owners</p>
        </div>

       
      </div>

    </div>
  );
}