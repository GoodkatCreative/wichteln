function parseNames(text) {
  const names = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  if (names.length < 3) return { error: 'Bitte mindestens 3 Namen eingeben.' };
  const lower = names.map(n => n.toLowerCase());
  if (new Set(lower).size !== names.length) return { error: 'Jeder Name darf nur einmal vorkommen.' };
  return { names };
}

// Mischen, dann beschenkt jeder den Nächsten im Kreis – so zieht niemand sich selbst.
function draw(names, rand = Math.random) {
  const a = names.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Ergebnis in Eingabe-Reihenfolge: die Kreis-Reihenfolge würde die ganze Auslosung verraten.
  return names.map(giver => ({ giver, receiver: a[(a.indexOf(giver) + 1) % a.length] }));
}

function encodeHash(giver, receiver) {
  const bytes = new TextEncoder().encode(JSON.stringify({ g: giver, r: receiver }));
  const b64 = btoa(String.fromCharCode(...bytes));
  return '#' + b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeHash(hash) {
  try {
    // Messenger hängen gern ".", ")" o. Ä. an – alles ab dem ersten Fremdzeichen abschneiden.
    const b64 = hash.replace(/^#/, '').replace(/[^A-Za-z0-9_-][\s\S]*$/, '').replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const o = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (typeof o.g !== 'string' || typeof o.r !== 'string' || !o.g || !o.r) return null;
    return { giver: o.g, receiver: o.r };
  } catch {
    return null;
  }
}

if (typeof module !== 'undefined') module.exports = { parseNames, draw, encodeHash, decodeHash };
