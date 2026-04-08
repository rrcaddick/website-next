import PageHero from "@/components/ui/PageHero";
import type { ContactPageContent } from "@/lib/content";

interface Props {
  content: ContactPageContent;
}

export default function ContactPageTemplate({ content }: Props) {
  const { title, desktopSrc, mobileSrc, infoHeading, infoSections, formHeading, formFields, formSubmitLabel } = content;

  return (
    <div className="min-h-screen">
      <PageHero mobileSrc={mobileSrc} desktopSrc={desktopSrc} title={title} />

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg ">
            <h2 className="text-2xl font-bold mb-6 text-[#202635]">{infoHeading}</h2>

            <div className="space-y-4">
              {infoSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="font-semibold mb-2 text-[#202635]">{section.sectionTitle}</h3>
                  {section.sectionsItems.map((item, index) => (
                    <p key={index} className="text-gray-600">
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg ">
            <h2 className="text-2xl font-bold mb-6 text-[#202635]">{formHeading}</h2>

            <form className="space-y-4">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-[#202635] font-medium mb-2">
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
                className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors"
              >
                {formSubmitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
