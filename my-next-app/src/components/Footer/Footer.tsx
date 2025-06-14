import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#1129BD] text-white mt-[120px] h-[442px]">
      <div className="max-w-[1920px] mx-auto px-6 relative h-full">
        {/* divider */}
        <div className="absolute left-6 right-6 top-[380px] h-px bg-white/50" />

        {/* apps badges */}
        <div className="absolute w-[367px] h-[52px] left-1/2 top-[102px] -translate-x-[calc(367px/2-677.5px)] flex gap-4">
          <Image src="/appstore.svg" alt="App Store" width={180} height={52} />
          <Image src="/googleplay.svg" alt="Google Play" width={180} height={52} />
        </div>

        {/* right quick links */}
        <div className="absolute left-[659px] top-[100px] w-[476px] flex flex-wrap gap-5 text-[20px] leading-[22px] font-bold items-start text-white">
          {[
            "О нас",
            "Партнёрство",
            "FAQ",
            "Контакты",
            "Политика",
            "Условия",
          ].map((item) => (
            <Link key={item} href="#" className="w-max hover:underline">
              {item}
            </Link>
          ))}
        </div>

        {/* heading for quick links */}
        <h4 className="absolute text-[24px] font-bold left-[659px] top-[51px]">footer</h4>
        {/* heading for app badges */}
        <h4 className="absolute text-[24px] font-bold left-[1454px] top-[51px]">footer</h4>

        {/* left column main */}
        <div className="absolute left-6 top-[51px] flex flex-col gap-[37px] max-w-[391px]">
          <h3 className="text-[36px] font-bold leading-[22px]">Land of Soul Abkhazia</h3>
          <p className="text-[18px] leading-[22px] max-w-[370px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, quia.
          </p>
          <div className="flex items-center gap-5 w-[313px] h-[48px]">
            {new Array(6).fill(0).map((_, i) => (
              <span key={i} className="bg-white w-8 h-8 rounded" />
            ))}
          </div>
        </div>

        {/* bottom row links */}
        <div className="absolute flex gap-10 items-center bottom-[51px] left-6 text-white/50 text-[18px]">
          <Link href="#">privacy</Link>
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">Accessibility</Link>
        </div>
        <span className="absolute text-[18px] right-6 top-[389px] text-white/50">
          © 2024 All rights reserved
        </span>
      </div>
    </footer>
  );
} 