import {useContext, useState} from "react";
import {UserContext} from '../UseContext'
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from './PlacesPages'
import AccountNavigation from '../AccountNavigation'

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

 
  if (!ready) {
  
        
                 <Link to={'/'}  className="bg-primary rounded-full p-4" >Logout</Link>
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNavigation />
      {subpage === 'profile' && (
        <div className="text-center auto">
          


          <div >
          <Link to={'/'}  className="bg-primary rounded-full p-4" >Logout</Link>
          </div>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}