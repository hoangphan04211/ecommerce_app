import httpAxios from "./httpAxios";

const categoryService = {
    getAll: async () => {
        const response = await httpAxios.get("category-list");
        console.log("Raw API response:", response.data);
        return response.data.categorys; 
    },
};

export default categoryService;
