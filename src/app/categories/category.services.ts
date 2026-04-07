import { AllCategoryData, AllCategoryResponse } from "./category";

// 1. جلب كل الأقسام الرئيسية
export async function getAllCategory(): Promise<AllCategoryData[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
            // كاش لمدة ساعة لسرعة التصفح وتخفيف الضغط على السيرفر
            next: { revalidate: 3600 } 
        });

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data: AllCategoryResponse = await response.json();
        return data.data || [];

    } catch (error) {
        // منع ظهور شاشة "fetch failed" عند انقطاع الإنترنت
        console.error("Error in getAllCategory:", error);
        return []; 
    }
}

// 2. جلب بيانات قسم معين (بواسطة الـ ID)
export async function getCategoryById(categoriesId: string) {
    // التأكد من أن الـ ID ليس undefined قبل إرسال الطلب
    if (!categoriesId || categoriesId === "undefined") return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${categoriesId}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.data;

    } catch (error) {
        console.error(`Error in getCategoryById (${categoriesId}):`, error);
        return null;
    }
}

// 3. جلب الأقسام الفرعية التابعة لقسم رئيسي معين
export async function getSubCategoriesOfCategory(categoryId: string) {
    if (!categoryId || categoryId === "undefined") return [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${categoryId}/subcategories`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) return [];

        const data = await res.json();
        return data.data || [];

    } catch (error) {
        console.error(`Error in getSubCategoriesOfCategory (${categoryId}):`, error);
        return [];
    }
}