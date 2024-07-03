import React from "react";
import deleteIcon from "../images/deleteIcon.png";
import values from "../values";
import { toast } from "react-toastify";

function TeamMemberCard({ fetchUsers, member }) {
  async function handleDelete(id) {
    try {
      const response = await fetch(`${values.serverURL}/delete?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.info(data?.message);
      fetchUsers();
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    }
  }

  return (
    <div className="member-card">
      <div className="member-image">
        <img
          className="delete-icon"
          onClick={(e) => handleDelete(member._id)}
          src={deleteIcon}
          alt="deleteIcon"
        />
        <img
          src={member.image}
          alt={member.name}
        />
      </div>
      <div className="member-card-info">
        <h3>{member.name}</h3>
        <p>{member.email}</p>
      </div>
    </div>
  );
}

export default TeamMemberCard;
