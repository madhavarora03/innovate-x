import { apiSlice } from "./apiSlice"; // Adjust the import path

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/place-order",
        method: "POST",
        body: orderData,
      }),
    }),
    fetchOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    fetchMyOrders: builder.query({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
    }),
    fetchOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/cancel/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useFetchOrdersQuery,
  useFetchMyOrdersQuery,
  useFetchOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCancelOrderMutation,
} = orderApiSlice;
