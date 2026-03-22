import httpAxios from "./httpAxios";

const bannerService = {
    getAll: async () => {
        try {
            const response = await httpAxios.get("banner-list");
            console.log("Raw Banner API response:", response.data);
            return response.data.banners;
        } catch (error) {
            console.error("Lỗi tải banner:", error);
            return [];
        }
    },
};

export default bannerService;
