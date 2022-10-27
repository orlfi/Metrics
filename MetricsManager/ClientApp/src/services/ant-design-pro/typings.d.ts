// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    current?: number;
    pageSize?: number;
  };


  type ErrorResponse = {
    /** Business agreed error code */
    errorCode: string;
    /** Business error message */
    errorMessage?: string;
    /** Whether the request is successful */
    success?: boolean;
  };
}
