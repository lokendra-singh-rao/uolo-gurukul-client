import TeamMemberCard from "./TeamMemerCard";
import noResultsIcon from "../../assets/noResultsIcon.png";

function TeamGrid({ users, fetchUsers, isLoading }) {
  return (
    <>
      {!isLoading ? (
        users?.length > 0 && (
          <div className="team-grid">
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
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {users?.length === 0 && !isLoading && (
        <div className="no-user-found">
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
