import Button from "@/components/Button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import dict from "@/i18n/dict"

export default function NotFound() {
  useDocumentMeta({
    title: dict.notFound.title,
    description: dict.notFound.metaDescription,
  })

  return (
    <section className="border-b-3 border-ink py-[clamp(64px,12vw,160px)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start gap-8 px-(--pad)">
        <span className="font-display text-[clamp(96px,22vw,260px)] font-bold leading-[0.8] tracking-[-0.07em]">
          404
        </span>
        <h1 className="m-0 max-w-[24ch] font-display text-[clamp(28px,4vw,52px)] font-bold uppercase leading-[0.95] tracking-[-0.05em]">
          {dict.notFound.heading}
        </h1>
        <p className="m-0 max-w-[48ch] text-[15px] leading-[1.6]">
          {dict.notFound.body}
        </p>
        <Button to="/">
          {dict.notFound.backHome} <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </section>
  )
}
