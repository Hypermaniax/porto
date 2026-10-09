import { useEffect, useRef, useState } from "react"
import { useBlocker } from "react-router-dom"
import { useContent } from "@/data/use-content"

/**
 * Tirai perpindahan halaman brutaalis.
 * Klik antar halaman -> panel kuning menyapu dari kiri ke kanan;
 * di tengah sapuan (pas layar penuh tertutup) halaman berpindah + scroll
 * dipotong ke atas DI BAWAK tirai, lalu tirai lanjut lepas ke kanan
 * membuka halaman baru. Tanpa penunggu data, jadi cepat seki dluas.
 *
 * Sisi hitam di belakang mengikuti dengan jeda kecil saat lepas ->
 * ada "ekor" hitam yang kejar-kejaran, biar terasa mentah.
 */
const MASUK_MS = 240 // tirai menutup layar
const PEGANG_MS = 140 // halaman aseli (bawah tirai) dipinggang

type Fase = "diam" | "masuk" | "pegang" | "lepas"

// gaya panel per fase:
// masuk = animation keyframes (BUKAN transition) supaya sweep dari kiri
// tetap jalan walau elemen baru menghuni DOM seusai diklik.
function gayaPanel(fase: Fase, extraDelayMs = 0): React.CSSProperties {
  if (fase === "masuk")
    return {
      animation: `tirai-sapu ${MASUK_MS}ms cubic-bezier(0.72, 0, 0.2, 1) forwards`,
    }
  if (fase === "pegang") return { transform: "translateX(0)", transition: "none" }
  if (fase === "lepas")
    return {
      transform: "translateX(102%)",
      transition: `transform 400ms cubic-bezier(0.6, 0, 0.2, 1) ${extraDelayMs}ms`,
    }
  return { transform: "translateX(-102%)", transition: "none" }
}

export default function PindahWipe() {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname
  })
  const { profile } = useContent()

  // isi panggung: nama raksasa + teks jalan strip marquee
  const nama = (profile.firstName || profile.wordmark || "NIKO").toUpperCase()
  const jalur = `${nama} ✺ PAGES ✺ SWEEP ✺ `.repeat(4)

  const [fase, setFase] = useState<Fase>("diam")
  const jadwalRef = useRef<number[]>([])
  // blocker berubah tiap render — simpan yang terbaru supaya jadwal
  // setTimeout memproceed blocker yang masih sah
  const blockerRef = useRef(blocker)
  blockerRef.current = blocker

  useEffect(() => {
    if (blocker.state !== "blocked") return

    // maunya pengguna kurangi gerak: lewati tirai saja, langsung pindah
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      blockerRef.current?.proceed?.()
      return
    }

    setFase("masuk")

    // menutup: setelah tirai rapat di layar -> bebaskan halaman berganti
    // (di bawah tirai), sebentar dipinggang, kemudian tirai dilepas ke kanan.
    // Jadwal disimpan di ref DAN dibiarkan jalan sampai selesai: jangan
    // dibersihkan saat effect re-run (blocker.state ganti -> proceeding),
    // kalau tidak fase bisa terjebak "pegang" selamanya.
    jadwalRef.current.forEach((id) => window.clearTimeout(id))
    jadwalRef.current = [
      window.setTimeout(() => {
        blockerRef.current?.proceed?.()
        setFase("pegang")
      }, MASUK_MS),
      window.setTimeout(() => setFase("lepas"), MASUK_MS + PEGANG_MS),
      window.setTimeout(() => setFase("diam"), MASUK_MS + PEGANG_MS + 480),
    ]
  }, [blocker.state])

  // bersihkan jadwal hanya saat komponen benar-benar dibongkar
  useEffect(() => {
    return () => {
      jadwalRef.current.forEach((id) => window.clearTimeout(id))
      jadwalRef.current = []
    }
  }, [])

  if (fase === "diam") return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[240] overflow-hidden"
    >
      {/* lapisan hitam: kejar-kejaran di belakang kuning saat lepas.
          Isi minimal biar sekedar ekor: plus + tekstur garis miring halus. */}
      <div
        className="absolute inset-0 bg-ink"
        style={gayaPanel(fase, 70)}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 18px)",
          }}
        />
        <span className="absolute left-5 top-5 font-mono text-lg font-bold text-panel">
          ✺
        </span>
        <span className="absolute bottom-5 right-5 font-mono text-lg font-bold text-panel">
          ✺
        </span>
      </div>

      {/* panel utama kuning: panggung brutal pindah halaman */}
      <div
        className="absolute inset-0 bg-yellow"
        style={gayaPanel(fase, 0)}
      >
        {/* tekstur grid diagonal halus (pola pintas dari tirai intro) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 22px)",
          }}
        />

        {/* guratan silang di 4 sudut: kekunci papan cat brutal */}
        {["left-3.5 top-2 border-l-3 border-t-3", "right-3.5 top-2 border-r-3 border-t-3", "left-3.5 bottom-2 border-l-3 border-b-3", "right-3.5 bottom-2 border-r-3 border-b-3"].map(
          (pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`pointer-events-none absolute size-6 border-ink/70 ${pos}`}
            />
          ),
        )}

        {/* watermark wordmark raksasa hollow, miring nongol */}
        <strong
          aria-hidden="true"
          className="text-hollow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display text-[clamp(160px,36vw,420px)] font-bold leading-none tracking-[-0.07em] opacity-25"
        >
          {nama}
        </strong>

        {/* strip marquee miring: sama seperti intro, tapi arah hitam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-6%] top-[38%] w-[112%] -rotate-3 border-y-3 border-ink bg-ink py-2"
        >
          <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-[clamp(13px,2vw,24px)] font-bold uppercase tracking-[0.22em] text-panel">
            <span className="pr-6">{jalur}</span>
            <span className="pr-6">{jalur}</span>
          </div>
        </div>

        {/* chip sambutan miring di kiri atas */}
        <span className="absolute left-5 top-6 -rotate-2 border-3 border-ink bg-white px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-hard-xs max-mob:left-3 max-mob:top-4 max-mob:text-[10px]">
          NEXT PAGE // NO LOADING.
        </span>

        {/* cap kecil kanan bawah */}
        <span className="absolute bottom-6 right-5 rotate-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-black/70">
          EST. 2026
        </span>

        {/* stiker diamond berputar pojok kanan atas */}
        <span
          aria-hidden="true"
          className="absolute right-6 top-[64%] hidden size-20 place-items-center border-3 border-ink bg-pink shadow-hard-sm rotate-12 max-mob:size-14 mob:grid"
        >
          <span className="animate-spin-slow font-display text-2xl font-bold text-black [animation-direction:reverse]">
            ✺
          </span>
        </span>
      </div>
    </div>
  )
}
