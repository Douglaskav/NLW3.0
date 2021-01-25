import React from "react";

import "../styles/pages/orphanage-admin.css";
import SidebarAdmin from "../components/SidebarAdmin";

import { useLocation } from "react-router-dom";
import OrphanagesList from "../components/OrphanagesList";

export default function OrphanageAdmin() {
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");

  return (
    <div id="page-orphanage-admin">
      <SidebarAdmin page={page} />
      <OrphanagesList page={page} />
    </div>
  )
}
