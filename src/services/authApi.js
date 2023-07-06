import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi =  createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://cruise.pythonanywhere.com"}),
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

export const { useLoginUserMutation } = authApi;