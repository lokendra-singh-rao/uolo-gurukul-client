import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import TeamGrid from "./TeamGrid";
import Pagination from "../Pagination/Pagination";
import values from "../../values";
import { toast } from "react-toastify";
import styles from "./TeamPage.module.css";

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
        `${values.serverURL}/users?page=${currentPage}&query=${searchQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data?.err) {
        toast.error("Something went wrong! Please try again");
        setUsers([]);
        setTotalPage(0);
        setCurrentPage(1);
      } else {
        setUsers(data?.filteredUsers);
        setTotalPage(data?.totalPages);
        if (data.totalPages < currentPage && currentPage > 1) {
          setCurrentPage(data.totalPages);
        }
      }
    } catch (error) {
      setUsers([]);
      setTotalPage(0);
      setCurrentPage(1);
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
      className={styles.teamPage}
      style={{ zIndex: 0 }}
    >
      <h1>Our Team</h1>
      <SearchBar
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchUsers={fetchUsers}
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
