"use client";

import { toast } from "sonner";
import AppButton from "../shared/AppButton/AppButton";
import { Trash } from "lucide-react";
import { handleRemoveProduct } from "./AddToCart.action";

export default function HandleDeleteProduct({productId}: {productId : string} ) {
  function DeleteProduct() {
    
    toast.promise(handleRemoveProduct(productId), {
      loading: "Handle Delete Now...",
      success: "Product Remove Updated",
    });
  }
  return (
    <>
      <AppButton
      onClick={DeleteProduct}
        variant="outline"
        size="icon"
        className="text-red-500 hover:text-white border-red-100 hover:bg-red-500"
      >
        <Trash className="w-4 h-4" />
      </AppButton>
    </>
  );
}
