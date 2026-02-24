import { useState } from "react"
import { getBuddyApiUrl } from "../../utils/api"
import "./ContactForm.css"

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validate = () => {
    let newErrors = { name: "", email: "", message: "" }
    let valid = true

    if (!form.name.trim()) {
      newErrors.name = "Tell us your name 🙂"
      valid = false
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "That email looks suspicious"
      valid = false
    }

    if (!form.message.trim()) {
      newErrors.message = "Say something buddy"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const apiUrl = getBuddyApiUrl("api/v1/contact")
    if (!apiUrl) {
      setSubmitError("Contact service is not configured.")
      return
    }

    setLoading(true)
    setSuccess(false)
    setSubmitError("")

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12000)

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
        signal: controller.signal,
      })

      let data: unknown = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (!res.ok) {
        let message = `Request failed (${res.status})`
        if (
          data &&
          typeof data === "object" &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          message = (data as { message: string }).message
        }
        throw new Error(message)
      }

      setSuccess(true)
      setForm({ name: "", email: "", message: "" })
      window.setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setSubmitError("Request timed out. Please try again.")
      } else {
        setSubmitError((err as Error).message || "Something went wrong. Please try again.")
      }
    } finally {
      window.clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>

      <h2>Got something to say?</h2>
      <p className="contact-sub">Write to us</p>

      <div className="contact-fields">

        <p>
          Hello! I am{" "}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`input-line ${errors.name ? "error" : ""}`}
          />
        </p>
        {errors.name && <span className="error-text">{errors.name}</span>}

        <p>
          My e-mail is{" "}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`input-line ${errors.email ? "error" : ""}`}
          />
        </p>
        {errors.email && <span className="error-text">{errors.email}</span>}

        <p>I am writing to let you know</p>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`textarea-line ${errors.message ? "error" : ""}`}
        />
        {errors.message && (
          <span className="error-text">{errors.message}</span>
        )}

      </div>

      <button
        type="submit"
        className={`submit-btn ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? "Sending..." : success ? "Sent ✓" : "Submit"}
      </button>

      {submitError && <p className="error-text">{submitError}</p>}

    </form>
  )
}
