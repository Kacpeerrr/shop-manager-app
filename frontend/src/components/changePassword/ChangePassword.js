import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("Hasła nie pasują do siebie");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data);
    navigate("/profil");
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Zmień hasło</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Stare Hasło"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Nowe Hasło"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Potwierdź Nowe Hasło"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Zmień Hasło
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
