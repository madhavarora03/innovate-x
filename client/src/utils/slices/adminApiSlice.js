import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/admin';

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => '/products',
    }),
    fetchAllOrders: builder.query({
      query: () => '/orders',
    }),
    fetchAllReviews: builder.query({
      query: () => '/reviews',
    }),
    fetchAllUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchAllOrdersQuery,
  useFetchAllReviewsQuery,
  useFetchAllUsersQuery,
} = adminApiSlice;
