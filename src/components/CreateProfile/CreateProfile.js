import React, { useEffect, useState } from "react";

import values from "../../values.js";
import { toast } from "react-toastify";
import { isAlphanumeric, isEmailValid } from "../../utils/regexTesters.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../Shared/SuccessModal.js";
import FormInput from "../Shared/FormInput.js";
import UploadPhotoInput from "./UploadPhotoInput.js";
import FormActionButtons from "../Shared/FormActionButtons.js";
import styles from "./CreateProfile.module.css";

const CreateProfile = ({ setTeamPageActive }) => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

    if (formData.name.replace(" ", "").length >= 3) {
      setNameError(false);
    }

    if (formData.password === formData.confirmPassword) {
      setConfirmPasswordError(false);
    } else {
      if (!(formData.confirmPassword.length === 0)) {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }
    }

    if (formData.password.length >= 6) {
      setPasswordError(false);
    }

    if (isEmailValid(formData.email)) {
      setEmailError(false);
    }

    if (formData.email.length === 0) {
      setEmailError(false);
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
      let isError = false;

      //Form validations
      if (!isAlphanumeric(formData.name)) {
        setNameErrorMessage("Invalid name");
        setNameError(true);
        isError = true;
      } else {
        setNameError(false);
      }

      if (formData.name.replace(" ", "").length < 3) {
        setNameErrorMessage("Name must be at least 3 characters");
        setNameError(true);
        isError = true;
      } else {
        setNameError(false);
      }

      if (!isEmailValid(formData.email)) {
        setEmailErrorMessage("Invalid email");
        setEmailError(true);
        isError = true;
      } else {
        setEmailError(false);
      }

      if (formData.password.length < 6) {
        setPasswordErrorMessage(
          "Passwords must be at least 6 characters in length"
        );
        setPasswordError(true);
        isError = true;
      } else {
        setPasswordError(false);
      }

      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordErrorMessage("Password does not match");
        setConfirmPasswordError(true);
        isError = true;
      } else {
        setConfirmPasswordError(false);
      }

      if (image.data === "") {
        toast.error("Image not selected!");
        isError = true;
      }

      if (isError) {
        return;
      }

      setSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("image", image.data);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      const response = await fetch(`${values.serverURL}/users`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data?.err) {
        toast.error(data.err);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/team");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again later");
    } finally {
      setSubmitButtonDisabled(false);
      setSubmitting(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setImage({ preview: "", data: "" });
  };

  const handleFileChange = (e) => {
    if (
      e?.target?.files[0]?.type !== "image/jpeg" &&
      e?.target?.files[0]?.type !== "image/png"
    ) {
      toast.info("Only jpg|jpeg|png image type allowed!");
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
      {success && <SuccessModal setSuccess={setSuccess} />}
      <div className={styles.createProfileMain}>
        <h1>Create Profile</h1>
        <div className={styles.profileCreationContainer}>
          <form className={styles.createProfileForm}>
            <UploadPhotoInput
              image={image}
              handleFileChange={handleFileChange}
            />

            <FormInput
              placeholder={"Enter full name"}
              fieldName={"Name"}
              type={"text"}
              name={"name"}
              value={formData.name}
              handleChange={handleChange}
              isError={nameError}
              errorMessage={nameErrorMessage}
            />

            <FormInput
              placeholder={"Enter email"}
              fieldName={"Email-ID"}
              type={"email"}
              name={"email"}
              value={formData.email}
              handleChange={handleChange}
              isError={emailError}
              errorMessage={emailErrorMessage}
            />

            <FormInput
              placeholder={"Enter password"}
              fieldName={"Password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              handleChange={handleChange}
              isError={passwordError}
              errorMessage={passwordErrorMessage}
            />

            <FormInput
              placeholder={"Enter confirm password"}
              fieldName={"Confirm Password"}
              type={"password"}
              name={"confirmPassword"}
              value={formData.confirmPassword}
              handleChange={handleChange}
              isError={confirmPasswordError}
              errorMessage={confirmPasswordErrorMessage}
            />

            <FormActionButtons
              submitButtonDisabled={submitButtonDisabled}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              submitting={submitting}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
