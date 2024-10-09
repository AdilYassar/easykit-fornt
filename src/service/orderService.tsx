import { appAxios } from "./apiInterceptors";

export const createOrder = async (items: any, totalPrice: number) => {
    try {
        const response = await appAxios.post(`/order`, {
            items: items,
            branch: "66e92330b4b81702f7f71b15",
            totalPrice: totalPrice
        });
        console.log(response.data)
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Create order error:', error); // Use console.error for error logging
        return null; // Return null in case of error
    }
};
