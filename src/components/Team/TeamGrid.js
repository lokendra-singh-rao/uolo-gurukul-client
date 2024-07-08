import TeamMemberCard from "./TeamMemerCard";
import noResultsIcon from "../../assets/noResultsIcon.png";
import styles from "./TeamGrid.module.css";
import Loader from "../Shared/Loader";

function TeamGrid({ users, fetchUsers, isLoading }) {
  return (
    <>
      {!isLoading ? (
        users?.length > 0 && (
          <div className={styles.teamGrid}>
            {users?.map((member) => (
              <TeamMemberCard
                key={member._id}
                fetchUsers={fetchUsers}
                member={member}
              />
            ))}
          </div>
        )
      ) : (
        <Loader />
      )}
      {users?.length === 0 && !isLoading && (
        <div className={styles.noUserFound}>
          <img
            src={noResultsIcon}
            alt="No results"
          />
          <h2>No profiles found!</h2>
        </div>
      )}
    </>
  );
}

export default TeamGrid;
