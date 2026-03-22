// services/orderService.js
import httpAxios from "./httpAxios";

const orderService = {
    /* ======================
     |  ORDER
     ====================== */

    // Lấy danh sách đơn hàng của user đang đăng nhập
    getOrders: async () => {
        const response = await httpAxios.get("orders");
        return response.data;
    },

    // Tạo đơn hàng mới (checkout)
    createOrder: async (orderData) => {
        // orderData gồm: { name, email, phone, address, items: [{product_id, quantity, price}] }
        const response = await httpAxios.post("orders", orderData);
        return response.data;
    },

    // Xem chi tiết một đơn hàng
    getOrderById: async (id) => {
        const response = await httpAxios.get(`orders/${id}`);
        return response.data;
    },

    // Cập nhật đơn hàng (ví dụ: hủy đơn, đổi địa chỉ)
    updateOrder: async (id, data) => {
        const response = await httpAxios.put(`orders/${id}`, data);
        return response.data;
    },

    // Xóa đơn hàng
    deleteOrder: async (id) => {
        const response = await httpAxios.delete(`orders/${id}`);
        return response.data;
    },
};

export default orderService;
