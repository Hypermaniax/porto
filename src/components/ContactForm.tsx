import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import Button from "@/components/Button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import dict from "@/i18n/dict"
import type { L10n } from "@/i18n/use-lang"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { useLang } from "@/i18n/use-lang"

type Field_ = "name" | "email" | "message"
type Values = Record<Field_, string>
type Errors = Partial<Record<Field_, string>>
type Status = "idle" | "sending" | "sent"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues: Values = { name: "", email: "", message: "" }

function validate(
  field: Field_,
  value: string,
  t: (v: L10n) => string,
): string | undefined {
  if (!value.trim()) {
    if (field === "message") return t(dict.form.projectHint)
    return t(dict.form.required)
  }
  if (field === "email" && !emailPattern.test(value)) {
    return t(dict.form.emailInvalid)
  }
  return undefined
}

export default function ContactForm() {
  const { t } = useLang()
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  const handleChange = (field: Field_, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value, t) }))
    }
  }

  const handleBlur = (field: Field_) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field], t) }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Errors = {}
    ;(Object.keys(values) as Field_[]).forEach((field) => {
      const error = validate(field, values[field], t)
      if (error) nextErrors[field] = error
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setStatus("sending")
    timeoutRef.current = window.setTimeout(() => {
      setStatus("sent")
      setValues(initialValues)
      toast.add({
        title: t(dict.form.toastTitle),
        description: t(dict.form.toastDescription),
        type: "success",
      })
    }, 700)
  }

  const changeProps = (field: Field_) => ({
    id: field,
    name: field,
    value: values[field],
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => handleChange(field, event.target.value),
    onBlur: () => handleBlur(field),
  })

  return (
    <form
      className="flex flex-col gap-[22px] max-mob:[&_button]:w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">{t(dict.form.name)}</FieldLabel>
          <Input
            {...changeProps("name")}
            className="aria-invalid:border-red-500"
            placeholder={t(dict.form.namePlaceholder)}
          />
          {errors.name && (
            <FieldError id="name-error">{errors.name}</FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">{t(dict.form.email)}</FieldLabel>
          <Input
            {...changeProps("email")}
            className="aria-invalid:border-red-500"
            type="email"
            placeholder={t(dict.form.emailPlaceholder)}
          />
          {errors.email && (
            <FieldError id="email-error">{errors.email}</FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">{t(dict.form.message)}</FieldLabel>
          <Textarea
            {...changeProps("message")}
            className="aria-invalid:border-red-500"
            rows={4}
            placeholder={t(dict.form.messagePlaceholder)}
          />
          {errors.message && (
            <FieldError id="message-error">{errors.message}</FieldError>
          )}
        </Field>

        <Button type="submit" variant="black" disabled={status === "sending"}>
          {status === "sending" ? (
            t(dict.form.sending)
          ) : status === "sent" ? (
            t(dict.form.sent)
          ) : (
            <>
              {t(dict.form.send)} <span aria-hidden="true">↗</span>
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
