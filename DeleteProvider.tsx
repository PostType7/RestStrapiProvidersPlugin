/* 
    Logout wrapper 
*/
import { useThemeStore } from "components/themes/PureBaldrTheme/themeStore";
import { fetchApi, getCookie } from "helpers/P7RestControler";
import { useRouter } from "next/router";


interface Props {
  id: any;
  reFetch: any;
}

const DeleteProvider: React.FC<Props> = ({ children, id, reFetch }) => {
  const setAttr = useThemeStore((state: any) => state.setAttr);
  return (
    <div
      onClick={() => {
        fetchApi(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getCookie("jwt")}`,
            },
          },
          (res: any) => {
            if (res.error) {
              console.log("error", res);
            } else {
              reFetch[1]({
                loading: false,
                data: reFetch[0].data.filter(function (obj: any) {
                  return obj.id !== id;
                }),
              });
              setAttr({path:'theme.message.text',value:'Element was deleted.'})
              setAttr({path:'theme.message.status',value:'success'})
            }
          }
        );
      }}
    >
      {children}
    </div>
  );
};
export default DeleteProvider
