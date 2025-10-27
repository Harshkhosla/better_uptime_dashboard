import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface SignupRequest {
  email: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
  name?: string;
  token?: string;
}
export interface SignupResponse {
  user: User;
  message: string;
}

export interface LoginResponse {
  message: string;
  token: string;
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
  incident: number;
  uptime: Date;
  websiteStatus: any;
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

    login: builder.mutation<LoginResponse, SignupRequest>({
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
    getwebsitebyId: builder.query<Website, { websiteId: string }>({
      query: ({ websiteId }) => ({
        url: "website/status",
        method: "GET",
        params: { websiteId },
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
  useGetwebsitebyIdQuery,
} = authApi;
