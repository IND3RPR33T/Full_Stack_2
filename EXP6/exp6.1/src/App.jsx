import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    state: "",
    skills: []
  });

  const skillOptions = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox change
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value]
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value)
      });
    }
  };
  const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

  // Handle form submit
 const handleSubmit = (e) => {
  e.preventDefault();

  const age = calculateAge(formData.dob);

  alert(
`Form Submitted Successfully!

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Age: ${age} years
Address: ${formData.address}
State: ${formData.state}
Gender: ${formData.gender}
Skills: ${formData.skills.join(", ")}`
  );

  
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      address: "",
      state: "",
      skills: []
    });
  };

  return (
    <div className="form-card">
      <h2>User Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]}
  required
/>


        <div className="gender-group">
  <label className="gender-title">Gender:</label>

  <label className="radio-item">
    <input
      type="radio"
      name="gender"
      value="Male"
      checked={formData.gender === "Male"}
      onChange={handleChange}
      required
    />
    <span>Male</span>
  </label>

  <label className="radio-item">
    <input
      type="radio"
      name="gender"
      value="Female"
      checked={formData.gender === "Female"}
      onChange={handleChange}
      required
    />
    <span>Female</span>
  </label>
</div>

        <div>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
  <select
    name="state"
    value={formData.state}
    onChange={handleChange}
    required
  >
    <option value="">Select State</option>
    <option value="Punjab">Punjab</option>
    <option value="Haryana">Haryana</option>
    <option value="Delhi">Delhi</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
  </select>
</div>

        {/* Skills Section */}
        <div className="skills-group">
  <label className="skills-title">Select Skills:</label>

  {skillOptions.map((skill) => (
    <label key={skill} className="checkbox-item">
      <input
        type="checkbox"
        value={skill}
        checked={formData.skills.includes(skill)}
        onChange={handleSkillChange}
      />
      <span>{skill}</span>
    </label>
  ))}
</div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;