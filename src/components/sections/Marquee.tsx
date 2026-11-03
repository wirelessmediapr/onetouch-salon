import { marqueeWords } from "@/lib/data";

export function Marquee() {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div aria-hidden className="overflow-hidden bg-flame py-4 md:py-[22px]">
      <div className="animate-marquee flex w-max items-center gap-6 md:gap-10">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-10">
            <span className="font-display text-[22px] italic text-cream md:text-[30px]">{w}</span>
            <span className="font-display text-[22px] text-gold md:text-[30px]">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}
