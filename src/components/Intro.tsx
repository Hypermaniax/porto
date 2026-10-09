import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useContent, useContentLoaded } from "@/data/use-content"

/**
 * Intro = tirai pembuka bergaya brutalist.
 *
 * Tujuannya bukan sekadar "loading", tapi momen welcome: menutupi
 * jeda pengambilan konten (fetch ke API) supaya foto/tagline tidak
 * muncul telat di depan pengunjung.
 *
 * Alur:
 *  1. Huruf wordmark + kicker muncul staggered (CSS intro-rise).
 *  2. Persentase + bar berjalan (requestAnimationFrame, berhenti
 *     di 88% selama konten belum siap).
 *  3. Konten siap (atau fetch selesai/gagal) DAN waktu minimal
 *     tercapai -> progres ke 100% -> tirai berangkat (CSS .intro-lepas)
 *  4. "prefers-reduced-motion" -> intro hampir instan.
 *
 * Durasi minimal tetap dipakai walau fetch instan, agar animasi
 * terasa disengaja (bukan kedip email satu detik).
 */
const MIN_MS = 1600 // durasi minimal intro terlihat
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

  const [persen, setPersen] = useState(0)
  const [lepas, setLepas] = useState(false)

  // rAF + ref supaya loop animasi tidak memicu re-render efek.
  // titik nol waktu disimpan di ref (diinisialisasi saat efek pertama
  // jalan) supaya efek yang ter-restart tidak mengulang durasi intro.
  const progres = useRef(0)
  const mulaiRef = useRef<number | null>(null)
  const selesaiDipanggil = useRef(false)

  useEffect(() => {
    mulaiRef.current ??= performance.now()
    const mulai = mulaiRef.current
    // pengguna reduce-motion: cukup sekilas saja
    const minMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 250
      : MIN_MS
    let raf = 0
    const loop = (t: number) => {
      const lewat = t - mulai
      const target = loaded && lewat >= minMs ? 100 : Math.min(88, progres.current + 1.4)
      // gerak halus: mendekati target, lompatan kecil stabil
      progres.current += (target - progres.current) * 0.08
      setPersen(Math.round(progres.current))

      if (progres.current >= 99.5 && loaded && lewat >= minMs) {
        setLepas(true)
        onLepas?.()
        // tirai sudah berangkat -> bebaskan halaman
        window.setTimeout(() => {
          if (!selesaiDipanggil.current) {
            selesaiDipanggil.current = true
            onSelesai()
          }
        }, EXIT_MS)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [loaded, onLepas, onSelesai])

  // gerbang animasi halaman: selama kelas ini ada di <html>,
  // animasi hero (hero-rise/hero-wipe) tidak berjalan.
  // Kelas dilepas saat intro unmount = tirai SUDAH tertutup penuh,
  // dan baru saat itulah animasi index dimulai.
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

  const wordmark = (profile.wordmark || profile.initials || "HELLO").toUpperCase()
  const huruf = Array.from(wordmark)

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col justify-between overflow-hidden bg-panel text-panel-foreground ${lepas ? "intro-lepas" : ""}`}
      role="status"
      aria-label="Memuat portofolio"
    >
      {/* strip kuning di tepi ATAS - seret kuning saat tirai berangkat ke bawah */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-5 border-b-3 border-ink bg-yellow" />

      {/* baris atas */}
      <div className="intro-sel grid-flow flex items-center justify-between px-[var(--pad)] pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span>
          Welcome <span className="opacity-50">// Portfolio.</span>
        </span>
        <span className="intro-kursor inline-block h-3 w-2 bg-panel-foreground" />
      </div>

      {/* tengah: wordmark raksasa + peran */}
      <div className="px-[var(--pad)]">
        <h1 className="flex select-none flex-wrap items-baseline gap-x-4 font-display text-[clamp(64px,16vw,220px)] font-bold leading-none tracking-tight">
          {huruf.map((h, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="intro-huruf inline-block text-yellow"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {h}
            </span>
          ))}
          <span
            aria-hidden="true"
            className="intro-huruf inline-block text-panel-foreground"
            style={{ animationDelay: `${huruf.length * 90}ms` }}
          >
            .
          </span>
          <span className="sr-only">{wordmark}</span>
        </h1>
        <p
          className="intro-huruf mt-3 font-mono text-xs uppercase tracking-[0.18em] opacity-60"
          style={{ animationDelay: `${huruf.length * 90 + 180}ms` }}
        >
          {profile.role || "Fullstack Developer"} — Komponen dimuat…
        </p>
      </div>

      {/* bawah: bar + persen */}
      <div className="px-[var(--pad)] pb-8">
        <div className="mx-auto mb-3 flex max-w-3xl items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <span>{loaded ? "Konten siap" : "Mengambil konten…"}</span>
          <span data-testid="intro-persen">{String(persen).padStart(3, "0")}%</span>
        </div>
        <div className="mx-auto h-6 max-w-3xl border-3 border-ink bg-panel-foreground/10">
          <div
            className="h-full border-r-3 border-ink bg-yellow"
            style={{ width: `${persen}%` }}
          />
        </div>
      </div>
    </div>
  )
}
