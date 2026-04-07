
export default function (){
  return (
    <div className=" container mx-auto my-6 max-w-[90%]  "> 
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4">
        
        
        <div className="relative flex-1 bg-[#009867] rounded-2xl p-8 text-white overflow-hidden shadow-lg before:content-[''] before:absolute before:-top-16 before:-right-16 before:w-48 before:h-48 before:bg-white before:opacity-10 before:rounded-full after:content-[''] after:absolute after:-bottom-16 after:-left-16 after:w-32 after:h-32 after:bg-white after:opacity-10 after:rounded-full">
          
          <div className="relative z-10 flex flex-col h-full gap-4">
            
            
            <div className="flex items-center gap-2 bg-white/10 text-xs text-green-100 px-3 py-1.5 rounded-full w-fit">
              <span>🔥</span> 
              <span className="font-semibold text-green-50/90">Deal of the Day</span>
            </div>

          
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold tracking-tight">Fresh Organic Fruits</h3>
              <p className="text-sm text-green-50/80 max-w-[90%]">
                Get up to 40% off on selected organic fruits
              </p>
            </div>

            
            <div className="flex items-baseline gap-4 mt-1 mb-2">
              <span className="text-5xl font-black">40% OFF</span>
              <div className="text-sm">
                <span className="text-green-50/70">Use code: </span>
                <span className="font-bold text-white">ORGANIC40</span>
              </div>
            </div>

            
            <a href="#" className="flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-bold w-fit hover:bg-green-50 transition-colors mt-auto text-sm group">
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        
        <div className="relative flex-1 bg-[#FF653C] rounded-2xl p-8 text-white overflow-hidden shadow-lg before:content-[''] before:absolute before:-top-16 before:-right-16 before:w-48 before:h-48 before:bg-white before:opacity-10 before:rounded-full after:content-[''] after:absolute after:-bottom-16 after:-left-16 after:w-32 after:h-32 after:bg-white after:opacity-10 after:rounded-full">
         
          <div className="relative z-10 flex flex-col h-full gap-4">
            
           
            <div className="flex items-center gap-2 bg-white/15 text-xs text-orange-100 px-3 py-1.5 rounded-full w-fit">
              <span>✨</span> 
              <span className="font-semibold text-orange-50/90">New Arrivals</span>
            </div>

            
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold tracking-tight">Exotic Vegetables</h3>
              <p className="text-sm text-orange-50/80 max-w-[90%]">
                Discover our latest collection of premium vegetables
              </p>
            </div>

           
            <div className="flex items-baseline gap-4 mt-1 mb-2">
              <span className="text-5xl font-black">25% OFF</span>
              <div className="text-sm">
                <span className="text-orange-50/70">Use code: </span>
                <span className="font-bold text-white">FRESH25</span>
              </div>
            </div>

            
            <a href="#" className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold w-fit hover:bg-orange-50 transition-colors mt-auto text-sm group">
              Explore Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

