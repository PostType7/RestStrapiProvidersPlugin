/* 
    Logout wrapper 
*/

import { getCookie, fetchApi } from "helpers/P7RestControler";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useThemeStore } from "../themeStore";

interface Props {
  currentUserEndpoint: string;
}

export const CurrentUserProvider: React.FC<Props> = ({
  currentUserEndpoint,
  children,
}) => {
  const router = useRouter();
  const themeStore = useThemeStore((state: any) => state.theme);
  const setAttr = useThemeStore((state: any) => state.setAttr);

  const unauthenticateRedirrect = () =>{
    router.push("/login");
  }

  useEffect(() => {
    const token = getCookie("jwt");
    if(!token){
      unauthenticateRedirrect();
    }
    if (!themeStore.currentUser.id) {
      fetchApi(
        currentUserEndpoint,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (res: any) => {
          console.log("auth check",res.id)
          if (res.id) {
            setAttr({ path: "theme.currentUser", value: res });
            return true
          } 
          unauthenticateRedirrect();
         
        }
      );
    }
  }, []);

  return (
    <>
      {/* TODO, add guard to chldren rendering */}
      {children}
    </>
  );
};
