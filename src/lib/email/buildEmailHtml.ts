export function buildEmailHtml(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 14px;font-weight:600;background:#f3f4f6;border:1px solid #e5e7eb;text-transform:capitalize;">
            ${key}
          </td>
          <td style="padding:10px 14px;border:1px solid #e5e7eb;">
            ${value}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              
              <!-- Header -->
              <tr>
                <td style="background:#0E7D73;color:#C9DD94;padding:18px 24px;font-size:20px;font-weight:bold;">
                  New Contact Form Submission
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    ${rows}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:16px 24px;font-size:12px;color:#6b7280;background:#f3f4f6;">
                  Sent from your website contact form
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}
