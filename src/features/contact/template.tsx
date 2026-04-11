"use client";

import { useState, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import { tinaField } from "tinacms/dist/react";
import type { ContactPageContent } from "@/lib/content";

interface Props {
  content: ContactPageContent;
}

const tf = tinaField as (obj: unknown, field: string) => string;

export default function ContactPageTemplate({ content }: Props) {
  const {
    title,
    desktopSrc,
    mobileSrc,
    infoHeading,
    infoSections,
    formHeading,
    formFields,
    formSubmitLabel,
    formConfig,
    emailTemplate,
  } = content;

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const fields: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, v as string]),
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, formConfig, emailTemplate }),
      });

      const json = (await res.json()) as { success: boolean };

      if (json.success) {
        setToast({
          type: "success",
          message: formConfig?.successMessage,
        });
        formRef.current?.reset();
      } else {
        throw new Error();
      }
    } catch {
      setToast({
        type: "error",
        message: formConfig?.errorMessage,
      });
    }

    setStatus("idle");

    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc={mobileSrc}
        desktopSrc={desktopSrc}
        title={title}
        tinaFields={{
          title: tf(content, "title"),
          mobileSrc: tf(content, "mobileSrc"),
          desktopSrc: tf(content, "desktopSrc"),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg">
            <h2 data-tina-field={tf(content, "infoHeading")} className="text-2xl font-bold mb-6 text-[#202635]">
              {infoHeading}
            </h2>

            <div className="space-y-4">
              {(infoSections ?? []).map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 data-tina-field={tf(section, "sectionTitle")} className="font-semibold mb-2 text-[#202635]">
                    {section.sectionTitle}
                  </h3>
                  <div data-tina-field={tf(section, "sectionsItems")}>
                    {(section.sectionsItems ?? []).map((item, index) => (
                      <p key={index} className="text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg">
            <h2 data-tina-field={tf(content, "formHeading")} className="text-2xl font-bold mb-6 text-[#202635]">
              {formHeading}
            </h2>

            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              {(formFields ?? []).map((field) => (
                <div key={field.name}>
                  <label
                    data-tina-field={tf(field, "label")}
                    htmlFor={field.name}
                    className="block text-[#202635] font-medium mb-2"
                  >
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={status === "submitting"}
                data-tina-field={tf(content, "formSubmitLabel")}
                className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : formSubmitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full animate-[slideIn_0.3s_ease]">
          <div
            className={`flex items-start gap-3 px-6 py-5 rounded-xl shadow-2xl border
        ${
          toast.type === "success" ? "bg-green-600 text-white border-green-500" : "bg-red-600 text-white border-red-500"
        }`}
          >
            {/* Icon */}
            <div className="text-2xl leading-none">{toast.type === "success" ? "✓" : "⚠️"}</div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-base mb-1">
                {toast.type === "success" ? "Message sent" : "Something went wrong"}
              </p>
              <p className="text-sm opacity-90">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
