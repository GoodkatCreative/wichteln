# Wichtel-Seite – Design (kurz)

## Wozu
Eine Gruppe (Familie/Freunde) will wichteln. Jeder soll am Ende genau einen Namen haben, den er beschenkt. Die Seite läuft auf GitHub Pages und muss für Menschen 70+ ohne Hilfe bedienbar sein.

## Ziele
- Jeder bekommt genau eine Person, nie sich selbst.
- Empfänger-Seite: ein großer Knopf, dann groß der Name. Nichts zu suchen, nichts einzutippen.
- Budget **50 Euro** steht fett auf der Empfänger-Seite.
- Link kann beliebig oft wieder geöffnet werden.

## Nicht-Ziele
- Kein Login, kein Server, keine Datenbank.
- Keine Wunschzettel, keine Erinnerungen, keine E-Mails.
- Keine Ausschluss-Regeln (Paare etc.) – *Annahme, bitte korrigieren falls doch nötig.*

## Anti-Ziele
- Wenn Oma etwas tippen, scrollen oder suchen muss, ist es gescheitert.
- Der Organisator soll beim Verteilen nicht sehen, wer wen hat.

## Ansätze
1. **Organisator lost einmal aus, verteilt persönliche Links** – gewählt. Läuft rein statisch auf GitHub Pages, kein Fremddienst.
2. Jeder zieht selbst auf derselben Adresse – braucht externen Speicher (z. B. Firebase), mehr Aufwand und Fehlerquellen. Verworfen.

## Ablauf
- **Organisator-Seite:** Namen eingeben (ein Name pro Zeile) → „Auslosen“ → Liste „Link für <Name>“ mit Kopieren-Knopf je Person. Die Zuordnung wird nicht angezeigt.
- **Empfänger-Seite** (über den Link): „Hallo <Name>!“ → großer Knopf „🎁 Namen zeigen“ → „Du beschenkst: <NAME>“, darunter fett „Budget: 50 Euro“, darunter Hinweis „Diesen Link einfach wieder öffnen, um nachzusehen.“

## Technik (meine Entscheidungen)
- Eine einzige `index.html`, kein Build, keine Abhängigkeiten. Ohne Link-Parameter = Organisator-Ansicht, mit = Empfänger-Ansicht.
- Auslosung: zufällige Reihenfolge, jeder beschenkt den Nächsten im Kreis (garantiert: keiner zieht sich selbst).
- Name des Beschenkten steht verschleiert im Link-Anker (`#…`, wird nicht an den Server geschickt). Kein echter Schutz gegen Technik-Versierte, reicht für die Familie.
- Budget fest im Code („50 Euro“).
- Große Schrift (mind. ~28px), hoher Kontrast, ein Knopf pro Bildschirm, funktioniert auf dem Handy.

## Offen für den Bauenden
- Genaue Farben/Gestaltung im Rahmen „groß, klar, ruhig“.
- Wie der Kopieren-Knopf Erfolg zeigt.
