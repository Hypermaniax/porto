import type { ProjectStatus } from "@/data/portfolio"

export default function StatusStamp({ status }: { status: ProjectStatus }) {
  return (
    <span
      aria-hidden="true"
      className="absolute right-4 top-2 z-[5] -rotate-12 select-none border-[3.5px] border-current px-2.5 py-1 font-mono text-[clamp(13px,1.35vw,21px)] font-bold uppercase leading-none tracking-[0.2em] opacity-50 transition-[rotate,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6 group-hover:opacity-75"
      style={{
        WebkitMaskImage:
          "radial-gradient(3px 3px at 2px 2px, transparent 92%, black 100%)",
        WebkitMaskSize: "6px 6px",
        maskImage:
          "radial-gradient(3px 3px at 2px 2px, transparent 92%, black 100%)",
        maskSize: "6px 6px",
      }}
    >
      {status}
    </span>
  )
}
