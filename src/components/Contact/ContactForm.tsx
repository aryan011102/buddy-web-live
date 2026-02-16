import { useState } from "react"
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

    setLoading(true)
    setSuccess(false)

    // Simulated API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Submitting:", form)

    setLoading(false)
    setSuccess(true)

    setForm({ name: "", email: "", message: "" })

    setTimeout(() => setSuccess(false), 3000)
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

    </form>
  )
}
