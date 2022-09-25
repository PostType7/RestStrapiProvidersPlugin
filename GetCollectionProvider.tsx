/* 
    Logout wrapper 
*/
import { fetchApi } from "helpers/P7RestControler";
import { useRouter } from "next/router";
import { useEffect, memo, useState } from "react";

interface Props {
  data: [any, any];
  endpoint: string;
  query?: any;
}

const GetCollectionProvider: React.FC<Props> = memo(
  ({ children, data, endpoint, query = {} }) => {
    const qs = require("qs");
    const router = useRouter();
    const [guardian, setGuardian] = useState<Boolean>(false);
    /* 
      query example
      https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
  */
    const coreQuery = {
      sort: ["createdAt:desc"],
      populate: "*",
      pagination: {
        pageSize: 10,
        page: 1,
      },
      publicationState: "live",
      locale: ["en"],
    };

    // try guardian to disavble useeffect
    if (!guardian) {
      setGuardian(true);
      fetchApi(
        /* parse endpoint with query */
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${
          query
            ? "?" +
              qs.stringify(Object.assign(coreQuery, query), {
                encodeValuesOnly: true, // prettify URL
              })
            : ""
        }`,
        { method: "GET" },
        (res: any) => {
          res.error
            ? console.log("error", res)
            : data[1]({ loading: false, data: res.data, meta: res.meta });
        }
      );
      
    }

    // useEffect(() => {
    // }, [data[1], router?.query?.slugPath]);
    return <>{children}</>;
  }
);
export default GetCollectionProvider;
