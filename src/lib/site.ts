export const site = {
  name: "Lars Knoke",
  url: "https://larsknoke.com",
  email: "info@larsknoke.com",
  street: "Mecklenburger Straße 6",
  city: "37603 Holzminden",
  formEndpoint:
    process.env.NEXT_PUBLIC_FORMCARRY_ENDPOINT ||
    "https://formcarry.com/s/rJqKsktpG",
  recaptchaSiteKey:
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeyJJQUAAAAAMISiKRhCOGm5r0soj-GJO652DuG",
};
