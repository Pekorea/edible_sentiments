import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import AuthProvided from "./auth";
function NavBarAuth() {
  const location = useLocation();
  const path = location.pathname;

  return (
    path !== "/" && path !== "/signup" && path !== "/forgottenp" && <Navbar />
  );
}

export default function NavBarChecker() {
  const { userId } = AuthProvided();
  return userId && <NavBarAuth />;
}
