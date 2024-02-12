import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi =  createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://jiggybackend.com.ng/"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: "account/rest-auth/login/",
                    method: "post",
                    body,
                }
            },
        }),
    }),
})
export const { useLoginUserMutation } = authApi