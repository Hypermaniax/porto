// AdminPage = seluruh halaman /admin: login, daftar project, tombol
// tambah/edit/hapus. Hanya dipakai PEMILIK portfolio — teks UI
// sengaja bahasa Indonesia saja (tidak ikut sistem i18n publik).
//
// Alur satu file ini:
//   1. Saat dibuka: kalau ada token tersimpan -> cek /api/admin/me.
//   2. Belum login -> tampil form email+password (Firebase Auth via REST).
//   3. Login berhasil -> menyimpan token -> tampil dashboard.
//   4. Dashboard membaca /api/content (publik, tetap satu sumber data).

import { useCallback, useEffect, useState } from "react"
import {
  adminFetch,
  getStoredToken,
  loginAdmin,
  setStoredToken,
  type AdminMe,
} from "@/admin/api"
import ProjectForm from "@/admin/ProjectForm"
import type { Project } from "@/data/portfolio"

type View =
  | { kind: "login" }
  | { kind: "dashboard" }
  | { kind: "form"; initial: Project | null }

const inputCls =
  "w-full border-3 border-ink bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:bg-yellow"

export default function AdminPage() {
  const token = getStoredToken()
  const [me, setMe] = useState<AdminMe | null>(null)
  const [view, setView] = useState<View>({ kind: token ? "dashboard" : "login" })
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  // refreshProjects = muat ulang daftar dari GET /api/content.
  const refreshProjects = useCallback(() => {
    void adminFetch<{ projects: Project[] }>("/api/content").then((data) => {
      setProjects(data.projects)
    })
  }, [])

  // Cek token lama saat halaman dibuka pertama kali.
  useEffect(() => {
    if (!token) return
    adminFetch<AdminMe>("/api/admin/me")
      .then((meData) => {
        setMe(meData)
        setView({ kind: "dashboard" })
      })
      .catch(() => setStoredToken(null)) // token basi -> buang
    // (token dari getStoredToken sengaja tidak masuk dependency:
    //  cukup dijalankan sekali saat mount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Saat berganti ke dashboard, pastikan daftar project terbaru.
  useEffect(() => {
    if (view.kind === "dashboard") refreshProjects()
  }, [view, refreshProjects])

  async function handleMutate(path: string, method: string) {
    try {
      await adminFetch(path, { method })
      setNotice(null)
      refreshProjects()
      setView({ kind: "dashboard" })
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "aksi gagal")
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      <header className="mb-10 flex items-baseline justify-between border-b-3 border-ink pb-4">
        <h1 className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
          PANEL ADMIN — {me?.dev ? "MODE SETUP (belum ada admin)" : "TERKUNCI"}
        </h1>
        {me ? (
          <button
            className="border-3 border-ink bg-white px-3 py-1 text-[10px] font-bold uppercase"
            onClick={() => {
              setStoredToken(null)
              window.location.reload()
            }}
          >
            Keluar
          </button>
        ) : null}
      </header>

      {notice ? (
        <p className="mb-6 border-3 border-ink bg-pink px-3 py-2 text-xs font-bold">
          {notice}
        </p>
      ) : null}

      {view.kind === "login" ? (
        <LoginSection
          onLogin={(tokenBaru) => {
            setStoredToken(tokenBaru)
            adminFetch<AdminMe>("/api/admin/me").then((meData) => {
              setMe(meData)
              setView({ kind: "dashboard" })
            })
          }}
        />
      ) : null}

      {view.kind === "dashboard" ? (
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
              DAFTAR PROJECT — {projects ? `${projects.length} item` : "memuat…"}
            </h2>
            <button
              className="border-3 border-ink bg-yellow px-4 py-2 text-xs font-bold uppercase"
              onClick={() => setView({ kind: "form", initial: null })}
            >
              + Project baru
            </button>
          </div>

          <ul className="flex list-none flex-col gap-3 p-0">
            {projects?.map((project) => (
              <li
                key={project.slug}
                className="flex flex-wrap items-center justify-between gap-3 border-3 border-ink bg-white px-4 py-3"
              >
                <div>
                  <p className="m-0 font-mono text-xs font-bold">
                    {project.number} · {project.slug}
                  </p>
                  <p className="m-0 text-sm font-bold">{project.title}</p>
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
                    {project.status} · {project.category} · {project.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="border-3 border-ink bg-white px-3 py-1.5 text-[10px] font-bold uppercase"
                    onClick={() => setView({ kind: "form", initial: project })}
                  >
                    Edit
                  </button>
                  <button
                    className="border-3 border-ink bg-pink px-3 py-1.5 text-[10px] font-bold uppercase"
                    onClick={() => {
                      if (confirm(`Hapus project "${project.title}"? Tidak bisa dibatalkan.`)) {
                        void handleMutate(`/api/admin/projects/${project.slug}`, "DELETE")
                      }
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {view.kind === "form" ? (
        <section className="border-3 border-ink bg-surface p-6">
          <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.16em]">
            {view.initial ? "EDIT PROJECT" : "PROJECT BARU"}
          </h2>
          <ProjectForm
            initial={view.initial}
            onSaved={() => {
              refreshProjects()
              setView({ kind: "dashboard" })
            }}
            onCancel={() => setView({ kind: "dashboard" })}
          />
        </section>
      ) : null}
    </div>
  )
}

// LoginSection = form email + password.
function LoginSection({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setErr(null)
    try {
      const tokenBaru = await loginAdmin(email, password)
      onLogin(tokenBaru)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "login gagal"
      if (msg.includes("terlalu banyak")) {
        setErr("Terlalu banyak percobaan gagal — tunggu 10 menit, lalu coba lagi.")
      } else if (msg.includes("email atau password")) {
        setErr("Email atau password salah.")
      } else if (msg.includes("belum punya user admin") || msg.includes("setup")) {
        setErr("Database belum punya user admin. Jalankan di folder api-porto: go run . --create-user <email> <password>")
      } else {
        setErr(msg)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto max-w-sm border-3 border-ink bg-surface p-6">
      <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.16em]">
        MASUK ADMIN
      </h2>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em]" htmlFor="a-email">
            Email
          </label>
          <input id="a-email" type="email" required className={inputCls}
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em]" htmlFor="a-pass">
            Password
          </label>
          <input id="a-pass" type="password" required className={inputCls}
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {err ? (
          <p className="border-3 border-ink bg-pink px-3 py-2 text-xs font-bold">
            {err}
          </p>
        ) : null}
        <button type="submit" disabled={busy}
          className="border-3 border-ink bg-ink px-4 py-2 text-xs font-bold uppercase text-white"
        >
          {busy ? "memeriksa…" : "masuk"}
        </button>
        <p className="m-0 text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
          Panel ini dijaga login milik BE (bcrypt + sesi 7 hari). Lupa password: jalankan ulang go run . --create-user untuk menggantinya.
        </p>
      </form>
    </section>
  )
}
