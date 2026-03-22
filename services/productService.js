import httpAxios from "./httpAxios";

const productService = {
    getAll: async (params = {}) => {
        const response = await httpAxios.get("product-list", { params });
        return response.data.products;
    },
    // lấy chi tiết sản phẩm theo id
    getById: async (id) => {
        const response = await httpAxios.get(`product-row/${id}`); return response.data;
    },
    // lay sp moi
    getNew: async (limit = 5) => {
        const response = await httpAxios.get("product-new", { params: { limit } }); return response.data.products;
    },
    // lấy sản phẩm liên quan
    getRelated: async (id) => {
        const response = await httpAxios.get(`product-related/${id}`); return response.data.products;
    },
};

export default productService;
