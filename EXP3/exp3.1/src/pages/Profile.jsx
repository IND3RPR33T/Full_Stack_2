import React from "react";
import profileImg from "./profile.jpg";

function Profile() {
  return (
    <div>
      <h2>My Profile</h2>
      <img
        src={profileImg}
        alt="Profile"
        style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }}
      />
    </div>
  );
}

export default Profile;
