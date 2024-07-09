import React, { useEffect, useState } from "react";

import values from "../../values.js";
import { toast } from "react-toastify";
import { isAlphanumeric, isEmailValid } from "../../utils/regexTesters.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal.js";
import FormInput from "../Shared/FormInput.js";
import UploadPhotoInput from "./UploadPhotoInput.js";
import FormActionButtons from "./FormActionButtons.js";
import styles from "./CreateProfile.module.css";

const CreateProfile = ({ setTeamPageActive }) => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      if (
        image?.data === "" ||
        formData.name === "" ||
        formData.email === "" ||
        formData.password === "" ||
        formData.confirmPassword === ""
      ) {
        toast.error("All fields are required!");
        return;
      }

      if (!(isAlphanumeric(formData.name) && formData.name.length > 0)) {
        toast.error("Invalid name");
        return;
      }
      if (!isEmailValid(formData.email)) {
        // formError.email === true;
        return;
      }

      if (formData.password === "") {
        toast.error("Password empty!");
        return;
      }

      if (formData.password.length < 6) {
        toast.error("Passwords must be at least 6 characters in length!");
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
      toast.error("Something went wrong! Please try again later");
    } finally {
      setSubmitButtonDisabled(false);
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
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
              isError={formError.name}
              errorMessage={errorMessage.name}
            />

            <FormInput
              placeholder={"Enter email"}
              fieldName={"Email-ID"}
              type={"email"}
              name={"email"}
              value={formData.email}
              handleChange={handleChange}
              isError={formError.email}
              errorMessage={errorMessage.email}
            />

            <FormInput
              placeholder={"Enter password"}
              fieldName={"Password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              handleChange={handleChange}
              isError={formError.password}
              errorMessage={errorMessage.password}
            />

            <FormInput
              placeholder={"Enter confirm password"}
              fieldName={"Confirm Password"}
              type={"password"}
              name={"confirmPassword"}
              value={formData.confirmPassword}
              handleChange={handleChange}
              isError={formError.confirmPassword}
              errorMessage={errorMessage.confirmPassword}
            />

            <FormActionButtons
              submitButtonDisabled={submitButtonDisabled}
              handleSubmit={handleSubmit}
              submitting={submitting}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
