import Image from "next/image";
import HeroPoster from "@/public/heroPoster.png";

export default function HeroPosterSSR() {
  return (
    <div className="absolute inset-0 -z-20">
      <Image
        src={HeroPoster}
        alt="Hero poster"
        width={1621}
        height={912}
        sizes="(max-width: 768px) 100vw, 80vw"
        priority                
        fetchPriority="high"    
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}
