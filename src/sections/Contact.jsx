import { useState, useRef } from "react";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

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

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaValue: captchaValue, // IMPORTANT
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.message || "Captcha failed or server error");
        setErrors({ captcha: data.message || "Captcha failed" });
        return;
      }

      // SUCCESS
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCaptchaValue(null);

      recaptchaRef.current?.reset();

      setErrors({});
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError("Unable to reach server. Try again.");
    }
  };

  // ---------------- UI ----------------
  return (
    <section id="contact" className="py-16 bg-background/50">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="text-muted-foreground mt-2">Get in touch</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <FiMapPin className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p>Simara -01 Bara, Nepal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+977 9766196436</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p>nikeshojha71@gmail.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {!success && (
              <form onSubmit={handleSubmit} className="space-y-6">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-4 border rounded-xl"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-4 border rounded-xl"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-4 border rounded-xl"
                />
                {errors.subject && <p className="text-red-500">{errors.subject}</p>}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.message && <p className="text-red-500">{errors.message}</p>}

                {/* CAPTCHA */}
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfCFrcsAAAAANOinzMyTv-WIPAX8y4cj0pcs-i_"
                    onChange={handleCaptchaChange}
                  />

                  {errors.captcha && (
                    <p className="text-red-500 mt-2">{errors.captcha}</p>
                  )}

                  {submitError && (
                    <p className="text-red-500 mt-2">{submitError}</p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl"
                >
                  <FiSend />
                  Send Message
                </button>
              </form>
            )}

            {success && (
              <p className="text-green-500 text-center text-lg font-semibold">
                🚀 Message sent successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};