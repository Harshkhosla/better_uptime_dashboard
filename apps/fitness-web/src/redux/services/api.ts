import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { Meal } from "../../components/types/health";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Websites", "User", "llm"],
  endpoints: (builder) => ({
    signup: builder.mutation<
      { token: string; email: string },
      { email: string; password: string; name: string }
    >({
      query: (credentials) => ({
        url: "/users/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    saveprefrence: builder.mutation<
      { user: User },
      {
        height: number;
        age: number;
        weight: number;
        bmi: number;
        preferences: string;
      }
    >({
      query: (credentials) => ({
        url: "/website/updateUserDetails",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Websites"],
    }),
    getuserdetails: builder.mutation<
      {
        message: {
          id: string;
          email: string;
          name: string | null;
          userDetailsFilled: boolean;
          userDetails: UserDetails | null;
          createdAt: string;
          updatedAt: string;
        };
      },
      {}
    >({
      query: () => ({
        url: "/website/userDetails",
        method: "GET",
      }),
      invalidatesTags: ["Websites"],
    }),  
      getUsermeals: builder.mutation<
      {  meals: Meal },
      {  userDetails :UserDetails }
    >({
      query: (credentials) => ({
        url: "/llm/getllm",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
     getlatestUsermeals: builder.mutation<
      {  success: boolean; mealPlan: any },{}
    >({
      query: () => ({
        url: "/llm/active-meal-plan",
        method: "GET"
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSaveprefrenceMutation,
  useGetuserdetailsMutation,
  useGetUsermealsMutation,
  useGetlatestUsermealsMutation
} = api;

export type User = { id: string; email: string; name?: string };
export type UserDetails = {
  weight: number;
  bmi: number;
  height: number;
  preferences: string;
  age: number;
  id?: string;
};
export type Website = { id: string; url: string; timeAdded: string };
