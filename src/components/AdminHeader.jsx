import React, { useContext } from "react";
import { adminMenuContext } from "./contexts/Contexts";
import "../scss/components/adminHeader.scss";
function AdminHeader() {
  const { adminMenuPos, setAdminMenuPos } = useContext(adminMenuContext);
  return (
    <div>
      <div className="admin__header">
        <header>
          <div className="title">Admin panel</div>
        </header>
        <div
          className={
            adminMenuPos === "News"
              ? "menu__buttons newsbg"
              : adminMenuPos === "Playlists"
              ? "menu__buttons playlistsbg"
              : adminMenuPos === "Users"
              ? "menu__buttons adminsbg"
              : "menu__buttons"
          }
        >
          <button
            onClick={() => setAdminMenuPos("News")}
            className={adminMenuPos === "News" ? "btn1 active" : "btn1"}
          >
            News
          </button>
          <button
            onClick={() => setAdminMenuPos("Playlists")}
            className={adminMenuPos === "Playlists" ? "btn2 active" : "btn2"}
          >
            Playlists
          </button>
          <button
            onClick={() => setAdminMenuPos("Users")}
            className={adminMenuPos === "Users" ? "btn3 active" : "btn3"}
          >
            Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
