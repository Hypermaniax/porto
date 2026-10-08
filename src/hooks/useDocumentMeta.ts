import { useEffect } from "react"

type DocumentMeta = {
  title: string
  description?: string
}

export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const previousDescription = meta?.content

    if (description && meta) {
      meta.content = description
    }

    return () => {
      document.title = previousTitle
      if (description && meta && previousDescription !== undefined) {
        meta.content = previousDescription
      }
    }
  }, [title, description])
}
