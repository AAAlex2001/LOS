import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="w-full bg-white text-[#1129BD]">
      <Header />
      {/* Main content offset by header height */}
      <div className="pt-[152px]">
        {/* Tabs */}
        <section className="w-full max-w-[1920px] mx-auto flex gap-12 justify-center items-center h-[60px]">
          {["Жильё", "События", "Транспорт", "Маршруты"].map((label) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-4 py-2 cursor-pointer"
            >
              <span className="text-[30px] font-bold text-black">{label}</span>
              {/* underline indicator; hidden by default, can be controlled via state */}
              <span className="hidden h-[2px] w-20 bg-[#005BFF]"></span>
            </div>
          ))}
        </section>

        {/* Hero video placeholder */}
        <section className="w-full max-w-[1920px] mx-auto mt-4 px-6">
          <div className="w-full h-[701px] rounded-[15px] bg-[#1129BD]/10 flex items-center justify-center">
            <span className="text-sm font-light text-black/85">
              Видеоряд сменяющийся
            </span>
          </div>
        </section>

        {/* Banner */}
        <section className="w-full max-w-[1920px] mx-auto mt-[40px] px-6">
          <div className="w-full h-[305px] rounded-[15px] bg-[url('/banner.jpg')] bg-cover bg-center flex items-center justify-center">
            <p className="max-w-[1812px] px-8 text-center text-[38px] leading-[50px] font-semibold text-black/85">
              Пейзажи, которые захватывают дух, богатая история и вкусная еда, Абхазия не
              просто удивит — она покорит вас! <br /> <br /> Готовы к путешествию, которое
              останется в сердце навсегда?
            </p>
          </div>
        </section>

        {/* Cities heading */}
        <section className="w-full max-w-[1239px] mx-auto mt-[100px] px-6 flex justify-center">
          <h2 className="text-[40px] font-bold text-center">Города Абхазии</h2>
        </section>

        {/* Cities cards grid */}
        <section className="w-full max-w-[1240px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Гагра",
              subtitle: "Жемчужина Абхазии с пальмовой набережной, замками и крепостями",
              img: "/gagra.jpg",
            },
            {
              title: "Новый Афон",
              subtitle: "Пляжный отдых с панорамными видами или тихий отдых вдали от шума",
              img: "/afon.jpg",
            },
            {
              title: "Пицунда",
              subtitle: "Живописные сосны и кристально чистое море",
              img: "/pitsunda.jpg",
            },
          ].map((card) => (
            <div key={card.title} className="flex flex-col shadow-md rounded-[15px] border border-[#D5DAEF] overflow-hidden">
              <div className="w-full h-[300px] relative">
                <Image src={card.img} alt={card.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col items-center bg-[#1129BD]/10 p-4 gap-2">
                <h3 className="text-[#1129BD] text-[20px] font-bold uppercase text-center">
                  {card.title}
                </h3>
                <p className="text-[#1129BD] text-[20px] text-center leading-[22px]">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Call to action banner */}
        <section className="w-full max-w-[1920px] mx-auto mt-[120px] px-6">
          <div className="w-full h-[358px] rounded-[15px] bg-[url('/banner2.jpg')] bg-cover bg-center flex flex-col items-center justify-center gap-[60px]">
            <h2 className="text-[40px] font-bold text-center text-[#1129BD] max-w-[1872px]">
              Откройте для себя настоящую Абхазию
            </h2>
            <p className="max-w-[1812px] px-8 text-center text-[38px] leading-[50px] font-semibold text-black/85">
              Пейзажи, которые захватывают дух, богатая история и вкусная еда, Абхазия не
              просто удивит — она покорит вас!
            </p>
          </div>
        </section>

        {/* CTA cards */}
        <section className="w-full max-w-[1554px] mx-auto mt-[100px] flex flex-wrap justify-center gap-8 px-6">
          {["Ваш доктор", "Пляжи", "Горы", "Экскурсии", "Набережные"].map((label) => (
            <button
              key={label}
              className="px-6 py-3 w-[285px] rounded-full bg-[#1129BD]/[.1] border border-[#1129BD] text-[#1129BD] text-[20px]"
            >
              {label}
            </button>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
} 