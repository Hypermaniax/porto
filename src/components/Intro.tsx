import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useContent, useContentLoaded } from "@/data/use-content"

/**
 * Intro = tirai pembuka BRUTALIS.
 * (arah gaya mengikuti ui-ux-pro-max: raw, kontras tinggi, asimetris,
 * sudut tajam, border kasat mata, tanpa halus-halus)
 *
 * Momen welcome murni animasi (tanpa tulisan loading/memuat, tanpa bar
 * kemajuan): menutupi jeda pengambilan konten supaya foto/tagline tidak
 * muncul telat di depan pengunjung.
 *
 * Isi panggung:
 *  - nama raksasa gaya hero di index: miring + drop-shadow biru,
 *    tanpa garis bawah (huruf pop staggered)
 *  - strip marquee miring melintas di belakang wordmark
 *  - stiker "tape" + stiker diamond berputar di pojok
 *
 * Alur:
 *  1. Semua elemen pop staggered pop (CSS intro-rise / intro-pop).
 *  2. Konten siap (atau fetch selesai/gagal) DAN waktu minimal
 *     tercapai -> tirai berangkat (CSS .intro-lepas).
 *  3. "prefers-reduced-motion" -> intro hampir instan.
 */
const MIN_MS = 1700 // durasi minimal intro terlihat
const EXIT_MS = 750 // durasi animasi tirai berangkat

export default function Intro({
  onSelesai,
  onLepas,
}: {
  onSelesai: () => void
  // onLepas dipanggil TEPAT saat tirai mulai turun, bukan setelah tertutup.
  // Dipakai untuk memulai animasi halaman agar mekar BERSAMAAN dengan
  // tirai yang turun (terasa lebih hidup daripada menunggu buka penuh).
  onLepas?: () => void
}) {
  const { profile } = useContent()
  const loaded = useContentLoaded()

  const [lepas, setLepas] = useState(false)

  // titik nol waktu disimpan di ref (diinisialisasi saat efek pertama
  // jalan) supaya efek yang ter-restart tidak mengulang durasi intro.
  const mulaiRef = useRef<number | null>(null)
  const selesaiDipanggil = useRef(false)

  useEffect(() => {
    mulaiRef.current ??= performance.now()
    const mulai = mulaiRef.current
    // pengguna reduce-motion: cukup sekilas saja
    const minMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 250
      : MIN_MS

    const mulaiBerangkat = () => {
      setLepas(true)
      onLepas?.()
      // tirai sudah berangkat -> bebaskan halaman
      window.setTimeout(() => {
        if (!selesaiDipanggil.current) {
          selesaiDipanggil.current = true
          onSelesai()
        }
      }, EXIT_MS)
    }

    const ticker = window.setInterval(() => {
      if (loaded && performance.now() - mulai >= minMs) {
        window.clearInterval(ticker)
        mulaiBerangkat()
      }
    }, 100)
    return () => window.clearInterval(ticker)
  }, [loaded, onLepas, onSelesai])

  // gerbang animasi halaman: selama kelas ini ada di <html>,
  // animasi hero (hero-rise/hero-wipe) tidak berjalan.
  // Kelas dilepas PAS tirai mulai turun, agar animasi index
  // mekar bersamaan dengan tirai yang jatuh.
  useLayoutEffect(() => {
    if (!lepas) document.documentElement.classList.add("intro-aktif")
  }, [lepas])
  useEffect(() => {
    if (lepas) document.documentElement.classList.remove("intro-aktif")
  }, [lepas])
  useEffect(() => {
    return () => document.documentElement.classList.remove("intro-aktif")
  }, [])

  // kunci scroll selama intro tampil
  useEffect(() => {
    const asli = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = asli
    }
  }, [])

  // gaya nama seperti di index, tapi cukup nama depan saja
  const nama = (profile.firstName || profile.wordmark || "NIKO").toUpperCase()
  const huruf = Array.from(nama)

  // oranye strip marquee: teks digandakan supaya loop translateX(-50%) mulus
  const jalur = "WELCOME ✺ PORTFOLIO ✺ FULLSTACK ✺ ".repeat(6)

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col overflow-hidden bg-panel text-panel-foreground ${lepas ? "intro-lepas" : ""}`}
      role="status"
      aria-label="Pembuka situs"
    >
      {/* tekstur perdu grid diagonal - "grid kasat" ala brutal */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 22px)",
        }}
      />

      {/* strip kuning di tepi ATAS - seret kuning saat tirai berangkat ke bawah */}
      <span className="pointer-events-none absolute inset-x-0 top-0 z-20 h-5 border-b-3 border-ink bg-yellow" />

      {/* baris atas: chip sambutan miring + kursor kedip */}
      <div
        className="intro-pop relative z-10 mx-[var(--pad)] mt-7 flex items-start justify-between"
        style={{ animationDelay: "80ms", ["--rot" as never]: "-2deg" }}
      >
        <span className="relative -rotate-2 border-3 border-ink bg-yellow px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow-hard-xs">
          {/* "tape" perekat di kedua ujung stiker */}
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-[8deg] border-2 border-ink/20 bg-panel-foreground/25"
          />
          Welcome // Portfolio.
        </span>
        <span className="intro-kursor mt-3 inline-block h-3.5 w-2.5 bg-panel-foreground" />
      </div>

      {/* strip marquee miring melintas DI BELAKANG wordmark */}
      <div
        aria-hidden="true"
        className="intro-pop pointer-events-none absolute left-[-6%] top-[47%] z-0 w-[112%] -rotate-[3.5deg] border-y-3 border-ink bg-yellow py-2 text-black"
        style={{ animationDelay: "420ms", ["--rot" as never]: "-3.5deg" }}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-[clamp(14px,2.2vw,26px)] font-bold uppercase tracking-[0.22em]">
          <span className="pr-6">{jalur}</span>
          <span className="pr-6">{jalur}</span>
        </div>
      </div>

      {/* tengah: wordmark raksasa DEMPEM + peran */}
      <div className="relative z-10 flex flex-1 items-center px-[var(--pad)]">
        <div className="-translate-y-[5.5rem] max-mob:-translate-y-14">
          <h1 className="relative -rotate-[0.8deg] flex select-none flex-wrap items-baseline gap-x-[0.08em] font-display text-[clamp(56px,12vw,180px)] font-bold leading-[0.92] tracking-[-0.06em] [text-shadow:6px_6px_0_var(--blue)]">
            {huruf.map((h, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`intro-huruf inline-block ${h === " " ? "w-[0.25em]" : "text-panel-foreground"}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {h === " " ? "\u00A0" : h}
              </span>
            ))}
            <span className="sr-only">{nama}</span>
          </h1>
          <p
            className="intro-huruf mt-7 inline-block -rotate-1 border-x-3 border-panel-foreground/40 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] opacity-80"
            style={{ animationDelay: `${huruf.length * 85 + 150}ms` }}
          >
            {profile.role || "Fullstack Developer"}
          </p>
        </div>
      </div>

      {/* stiker diamond berputar di pojok kanan bawah */}
      <div
        className="intro-pop absolute bottom-10 right-[var(--pad)] z-10 hidden size-28 place-items-center border-3 border-ink bg-pink shadow-hard-sm max-mob:size-20 mob:grid"
        style={{ animationDelay: "560ms", rotate: "12deg", ["--rot" as never]: "12deg" }}
        aria-hidden="true"
      >
        <span className="animate-spin-slow font-display text-4xl font-bold text-black [animation-direction:reverse]">
          ✺
        </span>
      </div>

      {/* baris bawah: cap tangan kecil */}
      <div
        className="intro-pop relative z-10 mx-[var(--pad)] mb-7 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.24em] opacity-75"
        style={{ animationDelay: "700ms", ["--rot" as never]: "2deg" }}
      >
        <span className="rotate-1 border-3 border-panel-foreground/50 px-2.5 py-1.5">
          NO LOADING. JUST ENTRANCE.
        </span>
        <span className="-rotate-1 font-bold">EST. 2026</span>
      </div>
    </div>
  )
}
