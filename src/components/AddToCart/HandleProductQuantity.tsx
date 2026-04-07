"use client"

import { Minus, Plus } from "lucide-react";
import AppButton from "../shared/AppButton/AppButton";
import { handleProductQuantity } from "./AddToCart.action";
import { toast } from "sonner";


export default function HandleProductQuantity({count ,productId} : {count : number , productId : string}) {

    function handleProductCount(count : number){
        const data = {count};
        toast.promise(
            handleProductQuantity(data , productId ),
            {
                loading: "Handle Quentity Now...",
                success: "Product Quantity Updated"
            }
        )
    }
  return (
    <>
      <div className="flex p-1 w-fit items-center border rounded-lg bg-gray-100">
        <AppButton
        onClick={function(){handleProductCount(count - 1)}}
          variant="ghost"
          size="icon"
          className="h-8 w-8 shadow bg-white"
        >
          <Minus className="w-3 h-3" />
        </AppButton>
        <span className="px-4 font-medium">{count}</span>
        <AppButton
        onClick={function(){handleProductCount(count + 1)}}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white bg-main-color hover:bg-green-700"
        >
          <Plus className="w-3 h-3" />
        </AppButton>
      </div>
    </>
  );
}


