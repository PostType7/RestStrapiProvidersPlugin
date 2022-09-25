/* 
    Logout wrapper 
*/

import { NavItem } from "components/themes/NativeTheme/navigation";
import { deleteCookie, getCookie } from "helpers/P7RestControler";
import { useRouter } from "next/router";

export const Logout: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <NavItem
      onClick={() => {
        deleteCookie("jwt");
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
