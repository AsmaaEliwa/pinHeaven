function UserProfile({ user }) {
    if (!user) return null;
    return (
        <div className="userProfile">
            <div className="firstlitter"> {user.username[0]}</div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
    )
}
export default UserProfile