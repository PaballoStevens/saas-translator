import LogoImage from "@logos/logo.jpg";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

import Link from "next/link";
function Logo() {
  return <Link href="/" prefetch={false} className="ocerflow-hidden">
     <div className="flex item-center w-72 h-14">
        <AspectRatio
        ratio={16/9}
        className="flex items-center justify-center">
            <Image 
               priority
               src={LogoImage}
               alt="logo"
               className="dark:filter dark:invert"
            />
        </AspectRatio>
     </div>
     </Link>; 
  
}

export default Logo