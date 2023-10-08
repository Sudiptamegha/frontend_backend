import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // Step 1: Define a state variable for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Step 2: Create a dropdown menu component
  const DropdownMenu = () => {
    return (
      <div className="dropdownMenu" style={{background:'cornflowerblue', fontSize:'14px', padding:'3px'}}>
        {/* Add dropdown menu items here */}
        <Link to={`/profile/${user.username}`} className="dropdownMenuItem">
          My Profile
        </Link>
       <Link to="/"> <div className="dropdownMenuItem" onClick={handleLogout}>
          Logout
        </div></Link>
      </div>
    );
  };

  // Step 3: Toggle dropdown visibility when the profile picture is clicked
  const handleProfilePictureClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle logout (you can replace it with your actual logout logic)
  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem("user"); // Clear the authentication token from local storage (adjust the key as needed)
   window.location.reload()
  };


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocioMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarIconItem" onClick={handleProfilePictureClick}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>
    </div>
  );
}
