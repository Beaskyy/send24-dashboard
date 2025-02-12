import Cookies from "js-cookie";

let token: string | undefined;
// let token: any
if (typeof window !== 'undefined') {
  // token = localStorage.getItem("token");
  token = Cookies.get("token")
}
export default token;
