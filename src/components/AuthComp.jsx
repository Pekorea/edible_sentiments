import AuthProvided from "../lib/auth";
import { Link } from "react-router-dom";
export default function AuthCheck(props) {
  const { userId } = AuthProvided();

  return userId
    ? props.children
    : props.fallback || <Link to="/">You must be signed in</Link>;
}
