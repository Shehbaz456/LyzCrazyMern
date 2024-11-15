import React, { useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const LandingPage = () => {
  const API = import.meta.env.VITE_APP_URI_API;
  // "http://localhost:8000/api/v1/auth/register"
  let RegisterURL = `${API}/api/v1/auth/register`;
  // http://localhost:8000/api/v1/auth/login
  let LoginURL = `${API}/api/v1/auth/login`;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  // const years = Array.from({ length: 125 }, (_, i) => 1900 + i);

  // States for modal and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    state: "",
    city: "",
  });
  const [formDatalogin, setFormDatalogin] = useState({
    email: "",
    password: "",
  });

  const handleChangelogin = (e) => {
    const { name, value } = e.target;
    setFormDatalogin({ ...formDatalogin, [name]: value });
  };
  // Handle login form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatalogin),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Login Successful");
        setFormDatalogin({ email: "", password: "" });
        console.log("Login Successful:", result);

        // Handle successful login here
      } else {
        console.error("Login Failed:", result.message);
        toast.error(result.extraDetails || result.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login Failed !");
    }
  };

  // State options and corresponding cities
  const states = {
    Delhi: [
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
      "West Delhi",
      "Central Delhi",
      "Shahdara",
      "Rohini",
      "Dwarka",
      "Najafgarh",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Bhagalpur",
      "Muzaffarpur",
      "Aurangabad",
      "Darbhanga",
      "Sasaram",
      "Purnia",
      "Samastipur",
      "Katihar",
    ],
    Goa: [
      "Panaji",
      "Margao",
      "Mapusa",
      "Ponda",
      "Quepem",
      "Bicholim",
      "Curchorem",
      "Sankhali",
      "Dharbandora",
      "Pernem",
    ],
    "Uttar Pradash": [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Ghaziabad",
      "Allahabad",
      "Meerut",
      "Bareilly",
      "Moradabad",
      "Aligarh",
      "Jhansi",
      "Faizabad",
    ],
    "Jammu & kashmir": [
      "Srinagar",
      "Jammu",
      "Leh",
      "Kargil",
      "Anantnag",
      "Pulwama",
      "Rajouri",
      "Poonch",
      "Kathua",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data and reset city if state changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "state" && { city: "" }), // Reset city if state changes
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      dateOfBirth: {
        day: parseInt(formData.day, 10),
        month: parseInt(formData.month, 10),
        year: parseInt(formData.year, 10),
      },
      gender: formData.gender,
      state: formData.state,
      city: formData.city,
    };

    console.log(registerData);

    try {
      const response = await fetch(RegisterURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      console.log(response);

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration successful");
        console.log("Registration Successful:", result.message);

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          day: "",
          month: "",
          year: "",
          gender: "",
          state: "",
          city: "",
        });

        // Handle successful registration here
      } else {
        console.error("Registration Failed:", result.message);
        toast.error(result.extraDetails ? result.extraDetails : result.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Side: Video Section with Search Bar */}
        <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center bg-white">
          {/* Image Above Search Bar */}
          <div className="-mb-20 -mt-6 ">
            <img src="/images/lzycrazy.png" alt="LzyCrazy Logo" width={180} />
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-2/5 flex justify-center">
            <div className="flex items-center bg-white p-2 rounded-full border border-gray-300 shadow-md w-full max-w-md">
              <input
                type="text"
                readOnly
                placeholder="Coming Soon..."
                className="flex-grow px-1 py-1 rounded-l-full focus:outline-none"
              />
              <FaMicrophone className="text-gray-500 mx-2" />
              <FaSearch className="text-gray-500 mr-2" />
            </div>
          </div>

          {/* Video */}
          <div className="w-4/6 mt-8">
            <video controls className="w-full h-auto rounded-lg shadow-lg">
              <source src="https://res.cloudinary.com/dfv1qnzoz/video/upload/v1719039250/gh211amrhepwgubdirem.mp4" type="video/mp4" frameborder="0" allowfullscreen />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Side: Login Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
          <div className="w-full md:w-4/6 max-w-md border border-gray-200 p-4 rounded-lg shadow-md">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formDatalogin.email}
                  onChange={handleChangelogin}
                  id="email"
                  className="mt-1 block w-full px-4 py-4 text-lg border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="password"
                    value={formDatalogin.password}
                    onChange={handleChangelogin}
                    className="mt-1 block w-full px-4 py-4 text-lg border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 text-lg px-4 rounded-lg"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <a href="#" className="text-blue-600 hover:underline">
                Forgotten password?
              </a>
            </div>
            <hr className="my-5" />
            <div className="text-center mt-6">
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-2 text-lg rounded-lg"
                onClick={toggleModal}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup for "Create New Account" */}

      {/* Modal Popup for "Create New Account" */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-8 rounded-lg relative mx-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 font-bold border  text-gray-500 hover:text-gray-800 text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl text-center text-green-600 mb-4">
              Create New Account
            </h2>

            {/* Form Fields */}
            {/* Form Fields */}
            {/* Form Container with Scrolling on Small Devices */}
            <div className="max-h-[80vh] overflow-y-auto p-4 md:max-h-full">
              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                  <div className="relative w-full md:w-1/2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    {/* Flag Image */}
                    <img
                      src="/images/india.png"
                      alt="India Flag"
                      className="absolute left-3 top-7 w-6 h-6"
                    />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      placeholder="India Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-12 px-3 py-2 border rounded-lg focus:outline-none w-full"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      autoComplete="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      autoComplete="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                    <div className="w-full md:w-1/3">
                      <select
                        name="day"
                        id="day"
                        value={formData.day}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      >
                        <option>Day</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/3">
                      <select
                        name="month"
                        id="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      >
                        <option>Month</option>
                        {months.map((month, index) => (
                          <option key={month} value={index + 1}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/3">
                      <select
                        name="year"
                        id="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      >
                        <option>Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-wrap space-x-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Gender:{" "}
                  </h3>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>

                {/* State and City */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    >
                      <option value="">Select State</option>
                      {Object.keys(states).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      disabled={!formData.state}
                    >
                      <option value="">Select City</option>
                      {formData.state &&
                        states[formData.state].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Terms and Privacy */}

                <p className="text-left text-xs">
                  By Continuing, You Agree to Lzy Crazy Term & Conditions and
                  Confirm that You have Read Lzy Crazy Privacy Policy.
                </p>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="flex justify-between items-center bg-gray-300 p-5 text-gray-600 text-lg">
        <div className="flex gap-5 flex-wrap md:text-lg">
        

          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Advertising
          </a>
          <a href="#" className="hover:underline">
            Business
          </a>
          <a href="#" className="hover:underline">
            Investor
          </a>
          <a href="#" className="hover:underline">
            We are hiring
          </a>
        </div>
        <div className="flex gap-5 flex-wrap">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
