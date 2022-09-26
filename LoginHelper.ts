import { fetchApi } from "helpers/P7RestControler";
export const LoginHelper = (
  payload: any,
  router: any,
  errorMessageSetState: any
) => {
  fetchApi(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
    {
      method: "POST",
      payload: payload,
    },
    (res: any) => {
      if (res.jwt) {
        /* SUCCESS - set token as cookie */
        document.cookie = `jwt=${res.jwt}; expires=${new Date(
          /* 2.628e9 is one month in milisecond (to set token expiration time peroid ) */
          Date.now() + 2.628e9
        ).toUTCString()}; path=''`;

        /* redirect to dashboard */
        router.push("/backoffice");
      } else {
        errorMessageSetState([res.error.message]);
      }
    }
  );
};
