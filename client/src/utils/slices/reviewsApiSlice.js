import { apiSlice } from "./apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
    }),
    fetchReviewsByProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { rating, comment },
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    adminDeleteReview: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useFetchReviewsByProductQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useAdminDeleteReviewMutation,
} = reviewApiSlice;
