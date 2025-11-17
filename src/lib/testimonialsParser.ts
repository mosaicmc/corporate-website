export function normalizeTestimonialText(input: string): string {
  if (!input) return '';

  // Trim outer quotes to avoid double quoting in UI
  let text = input.trim().replace(/^"|^'|"$|'$/g, '');

  // Replace specific staff names with neutral role references
  const nameMap: Record<string, string> = {
    bronwyn: 'the caseworker',
    raj: 'the caseworker',
    // Add more known staff names here if needed
  };

  text = text.replace(/\b([A-Za-zÀ-ÖØ-öø-ÿ]+)\b/g, (match) => {
    const key = match.toLowerCase();
    return nameMap[key] ? nameMap[key] : match;
  });

  // Light cleanup: collapse extra spaces
  text = text.replace(/\s{2,}/g, ' ').trim();

  return text;
}

