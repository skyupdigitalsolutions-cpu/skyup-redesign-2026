import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SERVICES = [
  "SEO",
  "Performance Marketing",
  "Social Media Marketing",
  "Email Marketing",
  "Website Development",
  "UI/UX Design",
  "AI Automation",
  "Machine Learning",
  "Graphic Design",
  "Branding",
  "Complete Digital Growth Strategy",
  "Not sure yet — need guidance",
];

const BUDGETS = ["Under ₹50k", "₹50k – ₹1L", "₹1L – ₹3L", "₹3L – ₹5L", "₹5L+", "Let's discuss"];

const VALUE_PROPS = [
  "Free, no-obligation consultation",
  "Response within 24 business hours",
  "A strategy customized to your goals",
];

const ContactSchema = Yup.object({
  name: Yup.string().trim().required("Please enter your name."),
  company: Yup.string().trim().required("Please enter your company name."),
  email: Yup.string().trim().email("Please enter a valid email.").required("Email is required."),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9+\-\s()]{7,}$/, "Please enter a valid phone number.")
    .required("Phone number is required."),
  service: Yup.string().required("Please choose a service."),
  budget: Yup.string().required("Please pick a budget range."),
  message: Yup.string().trim().min(10, "Please add a little more detail.").required("Please add a message."),
});

const initialValues = { name: "", company: "", email: "", phone: "", service: "", budget: "", message: "" };

const inputBase =
  "w-full text-[14px] text-[#071B4D] bg-[#F5F8FF] border-[1.5px] rounded-xl px-[15px] py-2 transition-all placeholder:text-[#8095C8] focus:outline-none focus:bg-white focus:border-[#0037CA] focus:ring-4 focus:ring-[#0037CA]/25 font-['Poppins']";

const labelClass = "mb-2 block text-[14px] font-semibold text-[#071B4D]";

/* ---- tiny inline icons ---- */
const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...p}>
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactDetails() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        "https://skyupredesign-backend.onrender.com";

      const res = await fetch(`${apiBase}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Field names match the backend model exactly — no mapping needed.
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong.");

      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({ error: error.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#EEF3FF] to-white px-5 py-10 font-['Poppins'] sm:px-8 lg:py-15 lg:pb-25">
      {/* heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0037CA]">
          <span className="h-px w-7 bg-[#0037CA]" /> Let&rsquo;s connect
        </span>
        <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-[#071B4D]">
          Get a Free Consultation
        </h2>
        <p className="mt-4 text-[clamp(1.02rem,1.2vw,1.2rem)] text-[#3D5499]">
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* split card */}
      <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[24px] border border-[#CDDBFB] bg-white shadow-[0_30px_80px_-30px_rgba(0,55,202,0.35)] lg:grid lg:grid-cols-[0.82fr_1.18fr]">
        {/* LEFT — branded details panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0037CA] to-[#002896] p-8 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

          <div className="relative">
            <h3 className="text-[28px] font-bold leading-tight">Contact Details</h3>
            <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-[#C9D8FF]">
              Reach us directly, or drop your details in the form — whichever&rsquo;s easier for you.
            </p>

            <dl className="mt-9 space-y-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-[14px] uppercase tracking-[0.16em] text-white/80">Address</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-white/90">
                    Skyup Digital Solutions LLP, 2nd Floor, No. 23, 14A, Dasarahalli Main Road, E Block, Sahakar Nagar,
                    Byatarayanapura, Bengaluru, Karnataka – 560092
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-[14px] uppercase tracking-[0.16em] text-white/70">Business Hours</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-white/90">
                    Wednesday to Monday, 9:00 AM – 7:00 PM
                  </dd>
                </div>
              </div>
            </dl>

            <ul className="mt-10 space-y-3 border-t border-white/15 pt-7">
              {VALUE_PROPS.map((v) => (
                <li key={v} className="flex items-center gap-3 text-[14px] text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="p-6 sm:p-10">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0037CA]/[0.12] text-[#0037CA]">
                <CheckIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#071B4D]">Thanks — your message is on its way.</h3>
              <p className="mx-auto max-w-[38ch] text-[#3D5499]">
                Our team will review your goals and get back to you within 24 hours of a business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-7 rounded-xl border-[1.5px] border-[#0037CA] px-5 py-2.5 font-semibold text-[#0037CA] transition-colors hover:bg-[#0037CA] hover:text-white"
              >
                Send another message
              </button>
            </div>
          ) : (
            <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={handleSubmit}>
              {({ values, errors, touched, setFieldValue, isSubmitting, status }) => {
                const fieldClass = (name) =>
                  `${inputBase} ${touched[name] && errors[name] ? "border-[#0037CA] bg-white" : "border-[#CDDBFB]"}`;
                const ErrText = ({ name }) => (
                  <ErrorMessage name={name}>
                    {(msg) => <span className="mt-1.5 block text-[14px] font-medium text-red-600">{msg}</span>}
                  </ErrorMessage>
                );

                return (
                  <Form noValidate>
                    {/* API error banner */}
                    {status?.error && (
                      <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
                        {status.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Full Name <span className="text-[#0037CA]">*</span>
                        </label>
                        <Field id="name" name="name" placeholder="Jane Sharma" className={fieldClass("name")} />
                        <ErrText name="name" />
                      </div>
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          Business / Company Name <span className="text-[#0037CA]">*</span>
                        </label>
                        <Field id="company" name="company" placeholder="Acme Pvt Ltd" className={fieldClass("company")} />
                        <ErrText name="company" />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email Address <span className="text-[#0037CA]">*</span>
                        </label>
                        <Field id="email" name="email" type="email" placeholder="jane@company.com" className={fieldClass("email")} />
                        <ErrText name="email" />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number <span className="text-[#0037CA]">*</span>
                        </label>
                        <Field id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className={fieldClass("phone")} />
                        <ErrText name="phone" />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="mt-5">
                      <label htmlFor="service" className={labelClass}>
                        Service Interested In <span className="text-[#0037CA]">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          id="service"
                          name="service"
                          className={`${fieldClass("service")} cursor-pointer appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Field>
                        <svg
                          viewBox="0 0 12 8"
                          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2"
                          fill="none"
                          stroke="#0037CA"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <path d="M1 1.5L6 6.5L11 1.5" />
                        </svg>
                      </div>
                      <ErrText name="service" />
                    </div>

                    {/* Budget */}
                    <div className="mt-5">
                      <label className={labelClass}>
                        Budget <span className="text-[#0037CA]">*</span>
                      </label>
                      <div role="radiogroup" aria-label="Estimated budget" className="flex flex-wrap gap-2.5">
                        {BUDGETS.map((b) => {
                          const active = values.budget === b;
                          return (
                            <button
                              type="button"
                              key={b}
                              role="radio"
                              aria-checked={active}
                              onClick={() => setFieldValue("budget", b)}
                              className={`cursor-pointer select-none rounded-full border-[1.5px] px-[15px] py-[9px] text-[14px] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0037CA]/30 ${
                                active
                                  ? "scale-[1.03] border-[#0037CA] bg-[#0037CA] text-white shadow-[0_6px_16px_-6px_rgba(0,55,202,0.6)]"
                                  : "border-[#CDDBFB] bg-[#F5F8FF] text-[#3D5499] hover:border-[#0037CA] hover:text-[#0037CA]"
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                      <ErrText name="budget" />
                    </div>

                    {/* Message */}
                    <div className="mt-5">
                      <label htmlFor="message" className={labelClass}>
                        Your Message <span className="text-[#0037CA]">*</span>
                      </label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your business, goals, and the challenges you're facing."
                        className={`${fieldClass("message")} min-h-[118px] resize-y`}
                      />
                      <ErrText name="message" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group mt-7 flex w-full items-center justify-center cursor-pointer gap-2.5 rounded-xl bg-[#0037CA] px-6 py-4 text-[1.02rem] font-bold text-white shadow-[0_8px_22px_-8px_rgba(0,55,202,0.55)] transition-all hover:-translate-y-0.5 hover:bg-[#002896] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0037CA]/40 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending…" : "Get Started"}
                      {!isSubmitting && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    <p className="mt-5 border-t border-[#E2EAFE] pt-4 text-[12px] leading-[1.6] text-[#8095C8]">
                      <strong className="font-semibold text-[#3D5499]">Response time</strong> is usually within 24 hours
                      of a business day. Your details will always remain confidential and will not be shared with any
                      third party.
                    </p>
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
    </section>
  );
}
