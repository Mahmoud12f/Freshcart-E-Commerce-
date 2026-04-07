"use client";

import { Plus } from "lucide-react";
import AppButton from "../shared/AppButton/AppButton";
import { handleAddProductToCart } from "./AddToCart.action";
import { toast } from "sonner";
import { useContext } from "react";
import { CartCreatedContext } from "@/Context/CartContext/CartContext";


export default function AddToCart({id} : {id:string}) {
  const {setCartCount} = useContext(CartCreatedContext)

   function addProductToCart(){
   toast.promise( handleAddProductToCart({productId: id}),{
    loading: "Add To Cart...",
    success: function({status , message , numOfCartItems , cartId ,totalCartPrice ,  products}){
      setCartCount(numOfCartItems)
      return message
    },
    error: "Sorry Can't add this product"
   })
    }
  return (
    <AppButton onClick={addProductToCart} className="bg-main-color text-white w-10 h-10 rounded-full flex items-center justify-center p-0 transition-all hover:bg-green-800 shadow-md">
      <Plus className="w-8 h-8 text-white " />
    </AppButton>
  );
}
