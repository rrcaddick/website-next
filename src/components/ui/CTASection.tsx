import Link from "next/link";

interface CTAProps {
  heading: string;
  description?: string;
  button?: {
    href: string;
    label: string;
  };
  tinaFields?: {
    heading?: string;
    description?: string;
    button?: string;
  };
}

export default function CTASection({ heading, description, button, tinaFields }: CTAProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 data-tina-field={tinaFields?.heading} className="text-3xl font-bold mb-6">{heading}</h2>
      {description && <p data-tina-field={tinaFields?.description} className="text-gray-600 mb-8 leading-relaxed">{description}</p>}
      {button && (
        <Link
          href={button.href}
          target="blank"
          data-tina-field={tinaFields?.button}
          className="inline-block bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors font-medium"
        >
          {button.label}
        </Link>
      )}
    </div>
  );
}
