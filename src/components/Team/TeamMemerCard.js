import React from "react";
import deleteIcon from "../../assets/deleteIcon.png";
import values from "../../values";
import { toast } from "react-toastify";
import styles from "./TeamMemberCard.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TeamMemberCard({ fetchUsers, member }) {
  async function handleDelete(id) {
    try {
      const response = await fetch(`${values.serverURL}/users?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.err) {
        toast.error("Something went wrong! Please try again");
      } else {
        toast.info(data?.message);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    }
  }

  return (
    <div
      key={member._id}
      className={styles.memberCard}
    >
      <div className={styles.memberImage}>
        <img
          className={styles.deleteIcon}
          onClick={(e) => handleDelete(member._id)}
          src={deleteIcon}
          alt="deleteIcon"
        />
        <img
          src={member.image}
          alt={member.name}
          style={{ animation: "ease-in 1s" }}
        />
      </div>
      <div className={styles.memberCardInfo}>
        <h3>{member.name || <Skeleton />}</h3>
        <p>{member.email}</p>
      </div>
    </div>
  );
}

export default TeamMemberCard;
