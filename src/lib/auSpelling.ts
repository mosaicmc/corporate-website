export function auSpelling(input: string): string {
  if (!input) return input;

  const rules: Array<[RegExp, string]> = [
    [/\bcolor\b/gi, 'colour'],
    [/\bcolors\b/gi, 'colours'],
    [/\bcoloring\b/gi, 'colouring'],

    [/\bhonor\b/gi, 'honour'],
    [/\bhonors\b/gi, 'honours'],
    [/\bhonored\b/gi, 'honoured'],
    [/\bhonoring\b/gi, 'honouring'],

    [/\borganization\b/gi, 'organisation'],
    [/\borganizations\b/gi, 'organisations'],
    [/\borganize\b/gi, 'organise'],
    [/\borganizes\b/gi, 'organises'],
    [/\borganized\b/gi, 'organised'],
    [/\borganizing\b/gi, 'organising'],

    [/\bbehavior\b/gi, 'behaviour'],
    [/\bbehaviors\b/gi, 'behaviours'],

    [/\bcenter\b/gi, 'centre'],
    [/\bcenters\b/gi, 'centres'],

    [/\blicense\b/gi, 'licence'],
    [/\blicenses\b/gi, 'licences'],
    [/\blicensed\b/gi, 'licenced'],

    [/\boptimize\b/gi, 'optimise'],
    [/\boptimized\b/gi, 'optimised'],
    [/\boptimizer\b/gi, 'optimiser'],
    [/\boptimizing\b/gi, 'optimising'],
    [/\boptimization\b/gi, 'optimisation'],

    [/\bcustomize\b/gi, 'customise'],
    [/\bcustomized\b/gi, 'customised'],
    [/\bcustomizing\b/gi, 'customising'],
    [/\bcustomization\b/gi, 'customisation'],

    [/\bpersonalize\b/gi, 'personalise'],
    [/\bpersonalized\b/gi, 'personalised'],
    [/\bpersonalizing\b/gi, 'personalising'],

    [/\bcatalog\b/gi, 'catalogue'],
    [/\bcatalogs\b/gi, 'catalogues'],

    [/\btraveling\b/gi, 'travelling'],
    [/\bcancelled\b/gi, 'cancelled'],
    [/\bcanceled\b/gi, 'cancelled'],
  ];

  let out = input;
  for (const [pattern, replacement] of rules) {
    out = out.replace(pattern, (m) => matchCase(replacement, m));
  }
  return out;
}

function matchCase(replacement: string, source: string): string {
  // Preserve capitalization style
  if (source.toUpperCase() === source) return replacement.toUpperCase();
  if (source[0] && source[0] === source[0].toUpperCase() && source.slice(1) === source.slice(1).toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement.toLowerCase();
}

// Convenience wrapper for JSX literals
export function AU(input: string): string {
  return auSpelling(input);
}

