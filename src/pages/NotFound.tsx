import Button from "@/components/Button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

export default function NotFound() {
  useDocumentMeta({
    title: "404 — Niko Agustio",
    description: "That page doesn’t exist. Head back to the portfolio.",
  })

  return (
    <section className="border-b-3 border-ink py-[clamp(64px,12vw,160px)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start gap-8 px-(--pad)">
        <span className="font-display text-[clamp(96px,22vw,260px)] font-bold leading-[0.8] tracking-[-0.07em]">
          404
        </span>
        <h1 className="m-0 max-w-[24ch] font-display text-[clamp(28px,4vw,52px)] font-bold uppercase leading-[0.95] tracking-[-0.05em]">
          THIS PAGE WENT MISSING.
        </h1>
        <p className="m-0 max-w-[48ch] text-[15px] leading-[1.6]">
          The link might be broken or the page may have moved. Let’s get you
          back to something useful.
        </p>
        <Button to="/">
          BACK TO HOME <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </section>
  )
}
