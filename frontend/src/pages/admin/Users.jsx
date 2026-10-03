import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserTable from "../../components/admin/UserTable";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import { getAdminUsers, updateAdminUser } from "../../services/adminApi";
import { useDebounce } from "../../hooks/useDebounce";
import Loader from "../../components/common/Loader";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminUsers({ page, limit: 15, search: debouncedSearch });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateRole = async (id, newRole) => {
    await updateAdminUser(id, { role: newRole });
    fetchUsers();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateAdminUser(id, { status: newStatus });
    fetchUsers();
  };

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="eyebrow">ADMINISTRATION</span>
            <h1>User Management</h1>
          </div>

          <div className="w-72">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
          </div>
        </div>

        {loading ? (
          <Loader message="Loading users..." />
        ) : (
          <>
            <UserTable
              users={users}
              onUpdateRole={handleUpdateRole}
              onUpdateStatus={handleUpdateStatus}
            />
            <div className="mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
