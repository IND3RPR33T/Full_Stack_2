import React from "react";
import myPhoto from "../Profile.jpg";

export default function Profile() {
  return (
    <div className="container">
      <h1 className="title">👤 Profile Page</h1>

      <div className="card profile-card">
        {/* ✅ Photo on top */}
        <img src={myPhoto} alt="My Photo" className="profile-img-square" />

        {/* ✅ Text below */}
        <div className="profile-content">
          <h2 className="name">Inderpreet Singh</h2>

          <p className="text">
            B.E. Computer Science student (AI & ML specialization) with a strong interest in Web Development and practical project building. Skilled in HTML, CSS, JavaScript and familiar with modern UI design and responsive layouts. Passionate about creating clean, user-friendly interfaces and continuously improving through hands-on experiments and coding practice. Highly motivated learner with a disciplined routine and goal-oriented mindset.
          </p>

          <h3 className="section-title">Internship</h3>
          <ul className="list">
            <li>Web Development Internship (Frontend / React)</li>
          </ul>

          <h3 className="section-title">Projects</h3>
          <ul className="list">
            <li>Student Portal UI</li>
            <li>To-Do App using React</li>
            <li>Responsive Navbar Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
