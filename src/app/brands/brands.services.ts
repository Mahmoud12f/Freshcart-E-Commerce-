
import { AllBrandsData, AllBrandsResponse } from "./brands";


export async function getAllBrands(): Promise<AllBrandsData[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, {
           
            next: { revalidate: 3600 } 
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch brands: ${response.status}`);
        }

        const data: AllBrandsResponse = await response.json();
        return data.data || []; 

    } catch (error) {
        console.error("Error in getAllBrands:", error);
        return [];
    }
}


export async function getProductsByBrand(brandId: string) {
    
    if (!brandId || brandId === "undefined") return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${brandId}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data?.data || null;

    } catch (error) {
        console.error(`Error in getProductsByBrand for ID ${brandId}:`, error);
        return null;
    }
}