import Slider from "@/components/Slider/Slider"
import image from "@images/home-slider-1.d79601a8.png";



 const sliderData = [
  {
    title: <>Fresh Products Delivered <br />to your Door</>,
    description: "Get 20% off your first order",
    button1: "Shop Now",
    button2: "View Deals",
    img: image
  },
  {
    title: <>Premium Quality <br />Guaranteed</>,
    description: "Fresh from farm to your table",
    button1: "Shop Now",
    button2: "Learn More",
    img: image
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    button1: "Order Now",
    button2: "Delivery Info",
    img: image
  }
];
export default function HomeSlider() {
  return (
   <Slider imageList={sliderData}/>
  )
}
