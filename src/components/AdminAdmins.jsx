import React, { useContext } from "react";
import "../scss/components/adminAdmins.scss";
import { roleContext } from "./contexts/Contexts";
import firebaseConfig from "./firebase/config";
function AdminAdmins() {
  const users = useContext(roleContext);
  const db = firebaseConfig.firestore();
  return (
    <div className="admin__admins">
      <div className="body">
        <div className="users">
          {users.users.map((ref) => (
            <div className="user">
              <div className="email">
                Email: <h4>{ref.email}</h4>
              </div>
              <div className="username">
                Username:{" "}
                <h4>{ref.username === null ? "none" : ref.username}</h4>
              </div>
              <div className="role">
                Role: <h4>{ref.role}</h4>
              </div>
              <button
                onClick={
                  ref.role === "admin"
                    ? () => {
                        db.collection("users").doc(ref.id).update({
                          role: "user",
                        });
                      }
                    : () => {
                        db.collection("users").doc(ref.id).update({
                          role: "admin",
                        });
                      }
                }
                className={ref.role === "admin" ? "admin" : ""}
              >
                {ref.role === "user" ? "Make an admin" : "Make an user"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAdmins;
