import { useFaculties } from "../../../global-hooks/facultyHooks";

type user = {
    id: string,
    faculty: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
}


function getAllUsers(): user[] { return []}

export default function UserManagementPage(){
    const {faculties} = useFaculties();
    const users = getAllUsers();
    return <div className="user-management-page">
        <section className="users-card">
            <div className="users-header">
                <h2>Users</h2>
            </div>

            <ul className="users-list">
                {users.map((u) => (
                    <li key={u.id} className="user-row">
                        <button className="user-row">
                            <p className="user-name">
                                {u.firstName} {u.lastName}
                                <span className="role-badge">{u.role}</span>
                            </p>

                            <p className="user-meta">{u.email} • {u.faculty}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
        <aside className="user-panel">
            <input className="search-input" placeholder="Search users..."/>
            <button className="primary-action">+ Create Manager</button>

            <div className="filter-group">
                 <p className="filter-title">Roles</p>
                <label className="filter-option"><input type="checkbox"/>Admin</label>
                <label className="filter-option"><input type="checkbox"/>Manager</label>
                <label className="filter-option"><input type="checkbox"/>User</label>
            </div>
            <div className="filter-group">
                <p className="filter-title">Faculties</p>
                {faculties.map(f => <label key={f.facultyId} className="filter-option"><input type="checkbox"/> {f.facultyName}</label>)}
            </div>
        </aside>
    </div>
}

