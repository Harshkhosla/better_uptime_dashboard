import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  message: string;
  token?: string;
}

export interface AuthError {
  message: string;
  status: number;
}
export interface Website {
  id: string;
  name: string;
  url: string;
  status: string;
  // Add other fields as needed
}

export interface WebsiteResponse {
  websites: Website[];
}

export const authApi = createApi({
  reducerPath: "CreateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Websites"],
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/users/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    createmonitor: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/website/website",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Websites"],
    }),
    getwebsites: builder.query<WebsiteResponse, void>({
      query: () => ({
        url: "website/website/all",
        method: "GET",
      }),
      providesTags: ["Websites"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetwebsitesQuery,
  useCreatemonitorMutation,
} = authApi;
