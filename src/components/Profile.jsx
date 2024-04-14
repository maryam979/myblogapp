import React, { useContext } from 'react';
import { useAuth } from '../context/AuthContext'; 

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Page</h2>
   
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>

        </div>
      
    </div>
  );
}

export default Profile;
