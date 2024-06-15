"use client";
import React from "react";

const PopUpMenu = ({ setPopMenu }) => {
  const Logout = async () => {
    try {
      const res = await fetch(`/api/Logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok || res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPopMenu(false);
    }
  };
  return (
    <div className="popupmenu" onClick={()=>setPopMenu(false)}>
      <div className="btn_pop">
        <button>Apps and Websites</button>
        <button>QR code</button>
        <button>Notifications</button>
        <button>Settings and Privacy</button>
        <button>Supervision</button>
        <button onClick={() => Logout()}>Log out</button>
        <button onClick={() => setPopMenu(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default PopUpMenu;
