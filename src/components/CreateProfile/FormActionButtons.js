import React from "react";

function FormActionButtons({ submitButtonDisabled, handleSubmit, submitting }) {
  return (
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
        {submitting ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default FormActionButtons;
