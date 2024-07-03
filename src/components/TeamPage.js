import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import TeamGrid from "./TeamGrid";
import Pagination from "./Pagination";
import values from "../values";
import { toast } from "react-toastify";

function TeamPage({ setTeamPageActive }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let shouldFetch = true;

  useEffect(() => {
    if (shouldFetch) fetchUsers();
    shouldFetch = false;
    setTeamPageActive(true);
  }, [currentPage]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${values.serverURL}/listUsers?page=${currentPage}&query=${searchQuery}`
      );
      const data = await response.json();
      setUsers(data?.filteredUsers);
      setTotalPage(data?.totalPages);
      if (data.totalPages < currentPage && currentPage > 1) {
        setCurrentPage(data.totalPages);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    shouldFetch = true;
  };

  return (
    <main
      className="team-page"
      style={{ zIndex: 0 }}
    >
      <h1 style={{ textAlign: "center" }}>Our Team</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={fetchUsers}
        setCurrentPage={setCurrentPage}
      />
      <TeamGrid
        users={users}
        fetchUsers={fetchUsers}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default TeamPage;
