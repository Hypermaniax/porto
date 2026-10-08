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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

type Field_ = "name" | "email" | "message"
type Values = Record<Field_, string>
type Errors = Partial<Record<Field_, string>>
type Status = "idle" | "sending" | "sent"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues: Values = { name: "", email: "", message: "" }

function validate(field: Field_, value: string): string | undefined {
  if (!value.trim()) {
    if (field === "message") return "Tell me a little about your project."
    return "This field is required."
  }
  if (field === "email" && !emailPattern.test(value)) {
    return "Enter a valid email address."
  }
  return undefined
}

export default function ContactForm() {
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
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }))
    }
  }

  const handleBlur = (field: Field_) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Errors = {}
    ;(Object.keys(values) as Field_[]).forEach((field) => {
      const error = validate(field, values[field])
      if (error) nextErrors[field] = error
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setStatus("sending")
    timeoutRef.current = window.setTimeout(() => {
      setStatus("sent")
      setValues(initialValues)
      toast.add({
        title: "MESSAGE SENT — NICE!",
        description: "Thanks! I got your message and will reply within a day.",
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
          <FieldLabel htmlFor="name">YOUR NAME</FieldLabel>
          <Input
            {...changeProps("name")}
            className="aria-invalid:border-red-500"
            placeholder="TYPE IT HERE..."
          />
          {errors.name && (
            <FieldError id="name-error">{errors.name}</FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">YOUR EMAIL</FieldLabel>
          <Input
            {...changeProps("email")}
            className="aria-invalid:border-red-500"
            type="email"
            placeholder="YOU@EMAIL.COM"
          />
          {errors.email && (
            <FieldError id="email-error">{errors.email}</FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">YOUR MESSAGE</FieldLabel>
          <Textarea
            {...changeProps("message")}
            className="aria-invalid:border-red-500"
            rows={4}
            placeholder="TELL ME EVERYTHING..."
          />
          {errors.message && (
            <FieldError id="message-error">{errors.message}</FieldError>
          )}
        </Field>

        <Button type="submit" variant="black" disabled={status === "sending"}>
          {status === "sending" ? (
            "SENDING..."
          ) : status === "sent" ? (
            "MESSAGE SENT — NICE!"
          ) : (
            <>
              SEND MESSAGE <span aria-hidden="true">↗</span>
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
