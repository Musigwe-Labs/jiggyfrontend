import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi =  createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://13.48.10.140/"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: "account/rest-auth/login/",
                    method: "post",
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation } = authApi