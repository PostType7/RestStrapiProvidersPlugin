/* 
    Logout wrapper 
*/

import { NavItem } from "components/themes/NativeTheme/navigation";
import { deleteCookie, getCookie } from "helpers/P7RestControler";
import { useRouter } from "next/router";

const Logout: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <NavItem
      onClick={() => {
        console.log(deleteCookie("jwt"));
        if (!getCookie("jwt")) {
          router.push("/login");
        } else {
          console.log("Logout error");
        }
      }}
    >
      Logout
    </NavItem>
  );
};
export default Logout;
