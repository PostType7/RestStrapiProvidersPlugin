import { fetchApi, getCookie } from "helpers/P7RestControler";
export const POSTHelper = (
  endpoint:string,
  payload: any,
  setAttr:any,
  router: any,
  redirect?:string
) => {
  fetchApi(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
      payload: payload,
    },
    (res: any) => {
      if (res.error) {
        setAttr({path:'theme.message.text',value:res.error.message})
        setAttr({path:'theme.message.status',value:'error'})
      } else {
        setAttr({path:'theme.message.text',value:'Notification was created.'})
        setAttr({path:'theme.message.status',value:'success'})
        router.push(redirect);
      }
    }
  );
};
