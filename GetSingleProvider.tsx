/* 
    Logout wrapper 
*/
import { fetchApi } from "helpers/P7RestControler";
import { useEffect } from "react";

interface Props {
  data: [any, any];
  endpoint: string;
  query?: any;
  id: any;
}

const GetSingleProvider: React.FC<Props> = ({
  children,
  data,
  endpoint,
  id,
}) => {
  /* 
      query example
      https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
  */

  useEffect(() => {
    fetchApi(
      /* parse endpoint with query */
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${id}`,
      { method: "GET" },
      (res: any) => {
        res.error
          ? console.log("error", res)
          : data[1](res.data.attributes);
      }
    );
  }, [data[1]]);
  return <>{children}</>;
};
export default GetSingleProvider;
