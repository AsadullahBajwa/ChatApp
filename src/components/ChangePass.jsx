import React, { useState } from "react";
import { Link } from "react-router-dom";
import  { FormButton } from  "./Styled-component/Buttons/Button";

const ChangePass = () => {
  // maintaining the state of form in component
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  
  // show hide password function
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const passwordInputType = showPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";


  // handling the changes in form feild
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ChangePass successful
        const data = await response.json();
        console.log(data);
        alert(data.message);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } else {
        // Handle ChangePass error
        console.error("ChangePass failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-holder auth">
      <div class="login change-password">
        <h2>Change Your Password</h2>
        <form class="login-form">
          <div class="textbox">
            <input type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <span class="material-symbols-outlined">mail</span>
          </div>
          <div class="textbox">
            <input
              type={passwordInputType}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span class="material-symbols-outlined"> lock </span>
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <div class="textbox">
            <input
              type={confirmPasswordInputType}
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <span class="material-symbols-outlined"> lock </span>
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => togglePasswordVisibility("confirm_password")}
            >
              {showConfirmPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <FormButton type="submit">Update Password</FormButton>
          <span>Go back to <Link to={'/login'}>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
