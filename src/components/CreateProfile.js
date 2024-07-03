import React, { useEffect, useState } from "react";
import uploadImageIcon from "../images/uploadImageIcon.png";
import uploadIcon from "../images/uploadIcon.png";
import successIcon from "../images/success.gif";
import values from "../values";
import { toast } from "react-toastify";
import { isAlphabetsOnly, isEmailValid } from "../utils/regexTesters.js";
import { useNavigate } from "react-router-dom";

const CreateProfile = ({ setTeamPageActive }) => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      image.data !== "" &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== ""
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [formData, image]);

  useEffect(() => {
    setTeamPageActive(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitButtonDisabled(true);
      //Form validations
      if (!(isAlphabetsOnly(formData.name) && formData.name.length > 0)) {
        toast.error("Invalid name");
        return;
      }
      if (!isEmailValid(formData.email)) {
        toast.error("Invalid email");
        return;
      }

      if (formData.password === "") {
        toast.error("Password empty!");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password does not match!");
        return;
      }

      if (image.data === "") {
        toast.error("Image not selected!");
        return;
      }

      const fromDataToSend = new FormData();
      fromDataToSend.append("image", image.data);
      fromDataToSend.append("name", formData.name);
      fromDataToSend.append("email", formData.email);
      fromDataToSend.append("password", formData.password);

      const response = await fetch(`${values.serverURL}/addUser`, {
        method: "POST",
        body: fromDataToSend,
      });
      const data = await response.json();
      if (data?.err) {
        toast.error(data.err);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    if (
      e?.target?.files[0]?.type !== "image/jpeg" &&
      e?.target?.files[0]?.type !== "image/png"
    ) {
      toast.info("Only jpg/jpeg/png image type allowed!");
      return;
    }
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      {success && (
        <div
          className="create-profile-backdrop flex"
          onClick={() => setSuccess(false)}
        >
          <div className="profile-create-success">
            <div>
              <img
                className="success-icon"
                src={successIcon}
              />
            </div>
            <div>User has been successfully created</div>
          </div>
        </div>
      )}
      <div className="create-profile-main">
        <h1>Create Profile</h1>
        <div className="profile-creation-container">
          <form className="create-profile-form">
            <div className="photo-upload">
              <label className="photo-upload-label">
                Upload Photo<span className="mandatory-field">*</span>
              </label>
              <p>Upload passport size photo</p>
              <div className="avatar-placeholder">
                <img
                  src={image.preview !== "" ? image.preview : uploadImageIcon}
                  alt="Avatar placeholder"
                />
                <div className="upload-btn flex">
                  <input
                    name="image"
                    type="file"
                    id="upload-input"
                    hidden
                    onChange={(e) => handleFileChange(e)}
                  />
                  <label
                    htmlFor="upload-input"
                    className="upload-icon"
                  >
                    <img
                      src={uploadIcon}
                      alt="upload-icon"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">
                Name<span className="mandatory-field">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email-ID<span className="mandatory-field">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password<span className="mandatory-field">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password<span className="mandatory-field">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          {/* styled component */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={submitButtonDisabled ? "disabled-btn" : "save-btn"}
              onClick={handleSubmit}
              disabled={submitButtonDisabled}
            >
              Save
            </button>
          </div>

          <hr className="profile-form-partition" />
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
