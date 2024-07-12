import React from "react";
import styles from "./SuccessModal.module.css";
import successIcon from "../../../assets/success.gif";

function SuccessModal({ setSuccess }) {
  return (
    <div
      className={styles.createProfileBackdrop}
      onClick={() => setSuccess(false)}
    >
      <div className={styles.profileCreateSuccess}>
        <div>
          <img
            className={styles.successIcon}
            src={successIcon}
            alt="success"
          />
        </div>
        <div>User has been successfully created</div>
      </div>
    </div>
  );
}

export default SuccessModal;
