import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi =  createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://16.171.34.50:8080"}),
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