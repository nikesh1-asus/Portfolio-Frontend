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

  // ---------------- INPUT HANDLER ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------- CAPTCHA ----------------
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value || null);
    setErrors({ ...errors, captcha: "" });
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
          ...formData,
          captchaValue: captchaValue || "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.message || "Failed to send message.");
        setErrors({ captcha: data.message || "Captcha failed" });
        return;
      }

      // success
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      setErrors({});

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError("Unable to reach the server. Please try again later.");
    }
  };

  // ---------------- UI ----------------
  return (
    <section id="contact" className="py-16 bg-background/50">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="text-muted-foreground mt-2">
            Get in touch with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
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
                <p>+977 9821121315</p>
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

          {/* RIGHT SIDE */}
          <div>

            {!success && (
              <form className="space-y-6" onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.subject && (
                  <p className="text-red-500">{errors.subject}</p>
                )}

                <textarea
                  rows={5}
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message}</p>
                )}

                {/* CAPTCHA */}
                <div>
                  <ReCAPTCHA
                    sitekey="6LecFrcsAAAAANUxc3gZZKjT3AGKfu_BRT7_CAz5"
                    onChange={handleCaptchaChange}
                    ref={recaptchaRef}
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