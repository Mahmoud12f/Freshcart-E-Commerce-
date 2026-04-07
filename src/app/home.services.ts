import { AllProductsData, AllProductsResponse, ProdcutDetailsResponse } from "./home.interface";


export async function getAllProducts(): Promise<AllProductsData[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, {
            next: { revalidate: 3600 } 
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data: AllProductsResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error("GetAllProducts Error:", error);
        return [];
    }
}

// جلب منتج محدد بناءً على الـ ID
export async function getSpeificProduct(id: string): Promise<AllProductsData | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);

        if (!response.ok) return null;

        const data: ProdcutDetailsResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error("GetSpecificProduct Error:", error);
        return null;
    }
}