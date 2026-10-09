// EmptyState = kotak "belum ada data" yang tampil kalau bagian
// tersebut menerima array kosong dari API (mis. backend mati,
// belum di-seed, atau memang belum ada isinya).
//
// Catatan styling: memakai border dashed + huruf mono supaya
// terlihat sebagai placeholder, bukan konten asli.
export default function EmptyState({
  note,
  tone = "yellow",
}: {
  note: string
  tone?: "yellow" | "blue" | "pink" | "mint"
}) {
  const toneClass = {
    yellow: "bg-yellow text-black",
    blue: "bg-blue text-white",
    pink: "bg-pink text-black",
    mint: "bg-mint text-black",
  }[tone]

  return (
    <div
      className="flex flex-col items-start gap-4 border-3 border-dashed border-ink bg-surface p-[clamp(24px,4vw,48px)]"
      data-reveal
    >
      <span
        className={`-rotate-2 border-3 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-hard-xs ${toneClass}`}
      >
        DATA
      </span>
      <p className="m-0 max-w-[46ch] font-display text-[clamp(18px,2vw,28px)] font-bold uppercase leading-[1.1] tracking-[-0.02em]">
        {note}
      </p>
    </div>
  )
}
