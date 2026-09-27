import { useState, useRef } from "react";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

// ---- palette (matched to the reference image) ----
const COLORS = {
  bg: "#0F1418",
  field: "#161C20",
  text: "#EDE8DF",
  muted: "#7C8A8C",
  accent: "#2FD9C4",
  error: "#FF4D4D",
};

export const Contact = () => {
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // ---------------- CAPTCHA ----------------
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!captchaValue) newErrors.captcha = "Please verify captcha";

    return newErrors;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaValue: captchaValue,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.message || "Captcha failed or server error");
        setErrors({ captcha: data.message || "Captcha failed" });
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCaptchaValue(null);

      recaptchaRef.current?.reset();

      setErrors({});
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError("Unable to reach server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- INPUT STYLE (shared) ----------------
  const fieldClass =
    "w-full px-5 py-4 rounded-2xl border-0 outline-none transition-colors focus:ring-2";
  const fieldStyle = { backgroundColor: COLORS.field, color: COLORS.text };

  // ---------------- UI ----------------
  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
            Contact Me
          </h2>
          <p className="mt-2" style={{ color: COLORS.muted }}>Get in touch</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <FiMapPin style={{ color: COLORS.accent }} className="text-2xl shrink-0" />
              <div>
                <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                  Location
                </h3>
                <p style={{ color: COLORS.muted }}>Simara -01 Bara, Nepal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone style={{ color: COLORS.accent }} className="text-2xl shrink-0" />
              <div>
                <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                  Phone
                </h3>
                <a
                  href="tel:+9779766196436"
                  style={{ color: COLORS.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
                >
                  +977 9766196436
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail style={{ color: COLORS.accent }} className="text-2xl shrink-0" />
              <div>
                <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                  Email
                </h3>
                <a
                  href="mailto:nikeshojha71@gmail.com"
                  className="break-all"
                  style={{ color: COLORS.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
                >
                  nikeshojha71@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {success ? (
              <div
                className="h-full flex items-center justify-center rounded-2xl py-16"
                style={{ backgroundColor: COLORS.field }}
              >
                <p style={{ color: COLORS.accent }} className="text-center text-lg font-semibold">
                  🚀 Message sent successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                    {errors.name && (
                      <p className="text-sm mt-1.5" style={{ color: COLORS.error }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                    {errors.email && (
                      <p className="text-sm mt-1.5" style={{ color: COLORS.error }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                  {errors.subject && (
                    <p className="text-sm mt-1.5" style={{ color: COLORS.error }}>
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={6}
                    className={`${fieldClass} resize-none`}
                    style={fieldStyle}
                  />
                  {errors.message && (
                    <p className="text-sm mt-1.5" style={{ color: COLORS.error }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfCFrcsAAAAANOinzMyTv-WIPAX8y4cj0pcs-i_"
                    onChange={handleCaptchaChange}
                    theme="dark"
                  />
                  {errors.captcha && (
                    <p className="text-sm mt-2" style={{ color: COLORS.error }}>
                      {errors.captcha}
                    </p>
                  )}
                  {submitError && (
                    <p className="text-sm mt-2" style={{ color: COLORS.error }}>
                      {submitError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.bg }}
                >
                  {submitting ? "Sending..." : "Send message"}
                  <FiSend />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};