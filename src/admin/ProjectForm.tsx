// ProjectForm = form "tulis/edit project" untuk halaman admin.
//
// Pemakaian:
//   <ProjectForm initial={project} onSaved={refresh} onCancel={close} />
//
//   - initial null  -> mode BIKIN BARU (POST)
//   - initial ada   -> mode EDIT (PUT ke /api/admin/projects/{slug})
//
// Teks konten SATU bahasa bebas — admin menuis bahasa apa pun,
// frontend menampilkan apa adanya.

import { useEffect, useState, type FormEvent } from "react"
import type {
  Project,
  ProjectGalleryItem,
  ProjectMetric,
} from "@/data/portfolio"
import { techData, techGroups, loadExtraTechs } from "@/data/tech-picker"
import type { TechLogoData } from "@/data/tech-logos"
import { adminFetch, uploadToCloudinary } from "@/admin/api"

// Gaya bersama semua input supaya tidak diulang-ulang.
const inputCls =
  "w-full border-3 border-ink bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:bg-yellow"
function allTechEntry(
  slug: string,
  extra: Record<string, TechLogoData> | null,
): TechLogoData | undefined {
  return (extra?.[slug] as TechLogoData | undefined) ?? techData(slug)
}

const labelCls = "block text-[10px] font-bold uppercase tracking-[0.12em] mb-1"

const emptyProject: Project = {
  number: "",
  slug: "",
  title: "",
  subtitle: "",
  summary: "",
  year: new Date().getFullYear().toString(),
  role: "",
  timeline: "",
  tags: [],
  stack: [],
  status: "PRELAUNCH",
  color: "yellow",
  visual: "listing",
  category: "FULLSTACK",
  challenge: "",
  approach: [],
  outcome: "",
  metrics: [],
  gallery: [],
}

export default function ProjectForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial: Project | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [p, setP] = useState<Project>(initial ?? emptyProject)
  const [extraTechs, setExtraTechs] = useState<Record<string, TechLogoData> | null>(null)

  useEffect(() => {
    let alive = true
    loadExtraTechs().then((extra) => {
      if (alive) setExtraTechs(extra)
    })
    return () => { alive = false }
  }, [])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editing = Boolean(initial)

  // set = pengganti `onChange` per field: set("title", "Abc").
  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setP((prev) => ({ ...prev, [key]: value }))
  }

  // -------- approach: textarea, 1 baris = 1 langkah --------
  function setApproachLines(value: string) {
    set("approach", value.split("\n").map((s) => s.trim()).filter(Boolean))
  }

  // -------- stack: chip picker (tekan lepas-pasang, slug aman) --------
  function toggleStack(slug: string) {
    setP((prev) => {
      const set = new Set(prev.stack as string[])
      if (set.has(slug)) set.delete(slug)
      else set.add(slug)
      return { ...prev, stack: Array.from(set) as Project["stack"] }
    })
  }

  // -------- metrics: baris dinamis --------
  function updateMetric(index: number, patch: Partial<ProjectMetric>) {
    setP((prev) => {
      const metrics = prev.metrics.map((m, i) =>
        i === index ? { ...m, ...patch } : m,
      )
      return { ...prev, metrics }
    })
  }
  function addMetric() {
    setP((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { value: "", label: "" }],
    }))
  }
  function removeMetric(index: number) {
    setP((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }))
  }

  // -------- gallery: baris dinamis (studi kasus dilindungi file) --------
  function updateGallery(index: number, patch: Partial<ProjectGalleryItem>) {
    setP((prev) => {
      const gallery = prev.gallery.map((g, i) => (i === index ? { ...g, ...patch } : g))
      return { ...prev, gallery }
    })
  }
  function addGallery() {
    setP((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { visual: "listing", caption: "" }],
    }))
  }
  function removeGallery(index: number) {
    setP((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const path = editing
        ? `/api/admin/projects/${p.slug}`
        : "/api/admin/projects"
      await adminFetch(path, {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(p),
      })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "gagal menyimpan")
    } finally {
      setBusy(false)
    }
  }

  async function handleUpload(file: File | null | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const url = await uploadToCloudinary(file)
      set("image", url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "unggah gagal")
    } finally {
      setBusy(false)
    }
  }

  // Unggah foto untuk satu item galeri, URL hasilnya langsung dipasang ke baris tsb.
  async function handleGalleryUpload(index: number, file: File | null | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const url = await uploadToCloudinary(file)
      updateGallery(index, { image: url })
    } catch (err) {
      setError(err instanceof Error ? err.message : "unggah gagal")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* --- dasar --- */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="f-title">Judul *</label>
          <input id="f-title" className={inputCls} required
            value={p.title}
            onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-slug">
            Slug {editing ? "(dikunci saat edit)" : "(kosong = otomatis dari judul)"}
          </label>
          <input id="f-slug" className={inputCls} disabled={editing}
            value={p.slug}
            onChange={(e) => set("slug", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="f-sub">Subjudul</label>
        <input id="f-sub" className={inputCls} value={p.subtitle}
          onChange={(e) => set("subtitle", e.target.value)} />
      </div>

      <div>
        <label className={labelCls} htmlFor="f-sum">Ringkasan</label>
        <textarea id="f-sum" className={inputCls} rows={2} value={p.summary}
          onChange={(e) => set("summary", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className={labelCls} htmlFor="f-year">Tahun</label>
          <input id="f-year" className={inputCls} value={p.year}
            onChange={(e) => set("year", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-status">Status</label>
          <select id="f-status" className={inputCls} value={p.status}
            onChange={(e) => set("status", e.target.value as Project["status"])}>
            <option value="PRELAUNCH">PRELAUNCH</option>
            <option value="LIVE">LIVE</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="f-color">Warna kartu</label>
          <select id="f-color" className={inputCls} value={p.color}
            onChange={(e) => set("color", e.target.value as Project["color"])}>
            <option value="mint">mint</option>
            <option value="blue">blue</option>
            <option value="pink">pink</option>
            <option value="yellow">yellow</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="f-cat">Kategori</label>
          <select id="f-cat" className={inputCls} value={p.category}
            onChange={(e) => set("category", e.target.value as Project["category"])}>
            <option value="FULLSTACK">FULLSTACK</option>
            <option value="FRONTEND">FRONTEND</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="f-role">Peran</label>
        <input id="f-role" className={inputCls} value={p.role}
          onChange={(e) => set("role", e.target.value)} />
      </div>

      <div>
        <label className={labelCls} htmlFor="f-timeline">
          Timeline (contoh: Feb 2024 – Apr 2024 · Personal project)
        </label>
        <input id="f-timeline" className={inputCls} value={p.timeline}
          onChange={(e) => set("timeline", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="f-live">URL Live (opsional)</label>
          <input id="f-live" className={inputCls} value={p.liveUrl ?? ""}
            onChange={(e) => set("liveUrl", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-repo">URL Repo (opsional)</label>
          <input id="f-repo" className={inputCls} value={p.repoUrl ?? ""}
            onChange={(e) => set("repoUrl", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="f-tags">Tags — pisahkan dengan koma</label>
        <input id="f-tags" className={inputCls}
          value={p.tags.join(", ")}
          onChange={(e) =>
            set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="f-stack">
          Stack — klik untuk pasang/lepas logo di kartu
        </label>
        <div className="flex flex-col gap-3">
          {techGroups.map((group) => (
            <div key={group.label}>
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.14em] opacity-60">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.slugs.map((slug) => {
                  const on = (p.stack as string[]).includes(slug)
                  const entry = allTechEntry(slug, extraTechs)
                  if (!entry) return null
                  return (
                    <button
                      key={slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleStack(slug)}
                      className={`flex items-center gap-1.5 border-3 px-2 py-1 text-[11px] font-bold uppercase transition-colors ${
                        on
                          ? "border-ink bg-yellow text-black shadow-hard-xs"
                          : "border-ink/30 border-dashed bg-white opacity-70 hover:opacity-100"
                      }`}
                    >
                      <entry.Icon size="1rem" color={entry.color} />
                      {entry.title}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-1 text-[9px] font-medium opacity-60">
          logo muncul di "Built with" kartu & studi kasus — slug otomatis benar
        </p>
      </div>

      {/* --- narasi studi kasus --- */}
      <div>
        <label className={labelCls} htmlFor="f-ch">Challenge</label>
        <textarea id="f-ch" className={inputCls} rows={4} value={p.challenge}
          onChange={(e) => set("challenge", e.target.value)} />
      </div>

      <div>
        <label className={labelCls} htmlFor="f-app">
          Pendekatan — satu langkah per BARIS
        </label>
        <textarea id="f-app" className={inputCls} rows={4}
          value={p.approach.join("\n")}
          onChange={(e) => setApproachLines(e.target.value)} />
      </div>

      <div>
        <label className={labelCls} htmlFor="f-out">Outcome</label>
        <textarea id="f-out" className={inputCls} rows={2} value={p.outcome}
          onChange={(e) => set("outcome", e.target.value)} />
      </div>

      {/* --- metrik --- */}
      <fieldset className="border-3 border-ink p-4">
        <legend className="px-2 text-xs font-bold uppercase tracking-[0.12em]">
          Metrik (angka kecil di kartu)
        </legend>
        {p.metrics.map((metric, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-4 sm:items-end">
            <div>
              <label className={labelCls} htmlFor={`f-met-v-${index}`}>Angka</label>
              <input id={`f-met-v-${index}`} className={inputCls}
                value={metric.value}
                onChange={(e) => updateMetric(index, { value: e.target.value })} />
            </div>
            <div className="sm:col-span-3">
              <label className={labelCls} htmlFor={`f-met-l-${index}`}>Label</label>
              <input id={`f-met-l-${index}`} className={inputCls}
                value={metric.label}
                onChange={(e) => updateMetric(index, { label: e.target.value })} />
            </div>
            <button type="button" onClick={() => removeMetric(index)}
              className="border-3 border-ink bg-white px-3 py-2 text-xs font-bold uppercase">
              Hapus
            </button>
          </div>
        ))}
        <button type="button" onClick={addMetric}
          className="mt-3 border-3 border-ink bg-yellow px-3 py-1.5 text-xs font-bold uppercase">
          + Metrik
        </button>
      </fieldset>

      {/* --- gambar utama --- */}
      <div>
        <label className={labelCls} htmlFor="f-image">Gambar utama (URL)</label>
        <input id="f-image" className={inputCls} value={p.image ?? ""}
          onChange={(e) => set("image", e.target.value)} />
        <div className="mt-2 flex items-center gap-3">
          <input type="file" accept="image/*"
            onChange={(e) => void handleUpload(e.target.files?.[0] ?? null)} />
          <span className="text-[10px] font-bold uppercase opacity-60">
            unggah ke Cloudinary
          </span>
        </div>
        {p.image ? (
          <img src={p.image} alt="pratinjau" className="mt-3 h-40 w-auto border-3 border-ink object-cover" />
        ) : null}
      </div>

      {/* --- galeri studi kasus --- */}
      <fieldset className="border-3 border-ink p-4">
        <legend className="px-2 text-xs font-bold uppercase tracking-[0.12em]">
          Galeri studi kasus
        </legend>
        {p.gallery.map((item, index) => (
          <div key={index} className="mt-2 border-3 border-ink bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor={`f-gal-vis-${index}`}>Visual</label>
                <select id={`f-gal-vis-${index}`} className={inputCls} value={item.visual}
                  onChange={(e) =>
                    updateGallery(index, { visual: e.target.value as ProjectGalleryItem["visual"] })}>
                  <option value="dashboard">dashboard</option>
                  <option value="listing">listing</option>
                  <option value="booking">booking</option>
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor={`f-gal-cap-${index}`}>Caption</label>
                <input id={`f-gal-cap-${index}`} className={inputCls} value={item.caption}
                  onChange={(e) =>
                    updateGallery(index, { caption: e.target.value })} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer border-3 border-ink bg-yellow px-3 py-1.5 text-xs font-bold uppercase">
                {busy ? "mengunggah…" : "unggah foto"}
                <input type="file" accept="image/*" className="sr-only"
                  onChange={(e) => {
                    void handleGalleryUpload(index, e.target.files?.[0] ?? null)
                    e.target.value = ""
                  }} />
              </label>
              <span className="text-[10px] font-bold uppercase opacity-60">
                otomatis ke Cloudinary
              </span>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor={`f-gal-img-${index}`}>
                  URL gambar (diisi otomatis setelah unggah)
                </label>
                <input id={`f-gal-img-${index}`} className={inputCls} value={item.image ?? ""}
                  onChange={(e) => updateGallery(index, { image: e.target.value })} />
              </div>
              {item.image ? (
                <img src={item.image} alt={`galeri ${index + 1}`}
                  className="h-24 w-auto max-w-full border-3 border-ink object-cover" />
              ) : null}
            </div>
            <button type="button" onClick={() => removeGallery(index)}
              className="mt-3 border-3 border-ink bg-white px-3 py-1 text-[10px] font-bold uppercase">
              Hapus
            </button>
          </div>
        ))}
        <button type="button" onClick={addGallery}
          className="mt-3 border-3 border-ink bg-yellow px-3 py-1.5 text-xs font-bold uppercase">
          + Item galeri
        </button>
      </fieldset>

      {/* --- hasil --- */}
      {error ? (
        <p className="-mx-1 border-3 border-ink bg-pink px-3 py-2 text-xs font-bold text-black">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy}
          className="border-3 border-ink bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
          {busy ? "menyimpan…" : editing ? "simpan perubahan" : "tambah project"}
        </button>
        <button type="button" onClick={onCancel}
          className="border-3 border-ink bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
          batal
        </button>
      </div>
    </form>
  )
}
