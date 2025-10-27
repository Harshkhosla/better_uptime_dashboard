import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { Meal } from "../../components/types/health";

interface MealResponse {
  id: string;
  name: string;
  type: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  isCompleted?: boolean;
}

interface DayResponse {
  date: string;
  meals: MealResponse[];
}

interface WeightEntry {
  id: string;
  userId: string;
  date: string;
  weight: number;
  goal: number | null;
  note: string | null;
  createdAt: string;
}

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
  tagTypes: ["Websites", "User", "llm", "Weight"],
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
        goalWeight?: number;
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
      Record<string, never>
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
      {  success: boolean; mealPlan: { days: DayResponse[] } }, Record<string, never>
    >({
      query: () => ({
        url: "/llm/active-meal-plan",
        method: "GET"
      }),
      invalidatesTags: ["User"],
    }),
    completeMeal: builder.mutation<
      { success: boolean; meal: MealResponse },
      { mealId: string; isCompleted: boolean }
    >({
      query: ({ mealId, isCompleted }) => ({
        url: `/llm/meals/${mealId}/complete`,
        method: "PATCH",
        body: { isCompleted },
      }),
      invalidatesTags: ["User"],
    }),
    addWeightEntry: builder.mutation<
      { success: boolean; weightEntry: WeightEntry },
      { weight: number; date?: string; goal?: number; note?: string }
    >({
      query: (data) => ({
        url: "/weight/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Weight", "User"],
    }),
    getWeightHistory: builder.query<
      { success: boolean; weightHistory: WeightEntry[]; count: number },
      { limit?: number; startDate?: string; endDate?: string }
    >({
      query: (params) => ({
        url: "/weight/history",
        method: "GET",
        params,
      }),
      providesTags: ["Weight"],
    }),
    getWeightStats: builder.query<
      { 
        success: boolean; 
        stats: {
          startWeight: number;
          currentWeight: number;
          goalWeight: number | null;
          totalChange: number;
          remainingToGoal: number | null;
          progressPercentage: number | null;
          avgWeeklyChange: number | null;
          totalEntries: number;
          firstEntry: string;
          lastEntry: string;
        } | null;
      },
      void
    >({
      query: () => ({
        url: "/weight/stats",
        method: "GET",
      }),
      providesTags: ["Weight"],
    }),
    deleteWeightEntry: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/weight/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Weight", "User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSaveprefrenceMutation,
  useGetuserdetailsMutation,
  useGetUsermealsMutation,
  useGetlatestUsermealsMutation,
  useCompleteMealMutation,
  useAddWeightEntryMutation,
  useGetWeightHistoryQuery,
  useGetWeightStatsQuery,
  useDeleteWeightEntryMutation,
} = api;

export type User = { id: string; email: string; name?: string };
export type UserDetails = {
  weight: number;
  bmi: number;
  height: number;
  goalWeight?: number;
  preferences: string;
  age: number;
  id?: string;
};
export type Website = { id: string; url: string; timeAdded: string };
