# Winchester — brand campaign toolkit (V1.1, Oct 2025)

Full extracted text: `brand-toolkit.txt`. Source PDF: `brand-toolkit.pdf`.

## How to apply this on this project

The toolkit is a **print and campaign** document. This project is a digital application,
and Daniel has licence to depart from it where the medium demands. Use it as the
authority for:

- **Content** — campaign lines, sub-pillars, tone, the "In The Making" idea
- **Core colours** — the seven palette hexes are correct and fixed
- **Type** — IvyPresto Display for headlines, Manrope for everything else
- **Verified statistics** — the only two figures we can legitimately state

Where digital needs what print never had to define, extend rather than obey: the purple
ramp (50–950) for borders, hovers, disabled states and mid-tone body copy; hover and
focus states; scroll and motion behaviour; component density. Keep the extensions
derived from the primary purples, not invented hues. The type/background contrast
pairings still hold — they are accessibility, not styling.

## Campaign: "In The Making"

Winchester helps students bring who they are into what they do. Making in both the
literal and figurative sense. No one arrives finished; drafts are welcome; learning is
lived, not just taught. "You're not a product at Winchester. You're in the making."

Creative pillars: **Celebrate one of a kinds** (never generic, never templated) ·
**Make place matter** (size, setting and city shape how we learn) · **Chase the moment**
(work in motion, not the polished result).

## Lead messages (hero lines — italic on the highlighted word)

- Find magic in the *making*
- In the room. In the moment. In the *making.*
- A place for learning, and for *living.*
- Small classes, *big thinking.*
- The best version of you isn't found – it's *made.*
- In *progress* is powerful

Sub-pillars: outcome-focused ("Careers aren't found – they're made", "Your CV just got
interesting", "Not just ready for what's next. Ready to define it.", "From work-ready to
world-ready") · student-led/lifestyle ("You're not a product. You're a process.", "For
smudged edges and sharp ideas", "For deadlines and daydreams", "A place for ideas that
haven't picked a lane yet") · place ("From campus to Cathedral in 3 songs flat",
"Crafted in cafés. Drafted in the Downs.", "This city's got layers. Just like you.",
"Small city. Huge line-up.").

## Colour

**Primary: Light Purple #C68EFD and Dark Purple #291647** — these make up the majority of
any application. Secondary (Lime #D4EF70, Orange #EC3C12) only to break up sections,
highlight/accent, or draw attention to a CTA.

Rules: **only ONE secondary colour within a visible area.** Never a secondary colour
without at least one primary present. Neutrals: Black #000000, Light Grey #F5F5F5,
White #FFFFFF.

Permitted type/background pairings only (all WCAG AA normal text or better): black on
white · black on light grey · dark purple on white · dark purple on light grey · dark
purple on lime · lime on dark purple · white on dark purple · light purple on dark
purple · black on orange. White on orange is **large text only**. Do not invent other
combinations.

## Type

- **IvyPresto Display Regular** — all headlines. Italic for highlights only.
- **Manrope Medium** — body, sub copy, and **buttons**. **Manrope Bold** — CTA copy and
  keyword emphasis only.
- Italics highlight words carrying conceptual weight or emotional resonance, tying back
  to "In The Making". Never everyday descriptive terms. One or two words, not more.

## Logo

Black or white **only** — never a palette colour. Black on light grounds, white on dark.
Left-aligned preferred, centre second, right last. Clear space = height of the "W" in
"Winchester"; page margin = 2× that. Don't stretch, recolour, outline, add effects,
straplines, graphics, or faculty text.

## Motifs

Frame messaging and create background patterns; particularly for framing photography,
where they draw focus to the subject.

| Motif | Inspiration | Sanctioned use |
|---|---|---|
| Star | Medieval door carvings in the city | Most used. Hero imagery, text framing, image framing, social frames, corners of full-bleed images |
| Greenery | The city's green landscapes | Hero imagery, social carousels, text framing, image framing, layered hero |
| Flower | Great Hall gold floral symbols | Large area — hero, social carousels, image framing, **windowing device to house photography** |
| Chapel | King Alfred Campus chapel window | Hero, tiled backgrounds, text framing, deck break slides |
| Archway | Westgate Arch | **Graphic device only** — tiled backgrounds, graphic motif behind cut-outs |
| Stripes | West Downs textured architecture | **Repeated accent or background layer only** — too intricate to frame text |
| Lecture theatre | West Downs auditorium | Background/tiled, behind hero cut-outs. Headline may sit on top **if legible**. The only motif that may be modified |
| West Downs | West Downs roof silhouette | **Tiled backgrounds and patterns only** — too detailed for messaging |

**Layered motifs** (a set of three) exist specifically to frame key messaging on end
cards, CTA frames and presentation title slides.

**Curved frame** is the curved element derived from the **star** motif. Ensure
photography is framed with key details visible and breathing space for text, CTAs, logo.

Don'ts: no stretching, distorting or modifying proportions (except lecture theatre) · no
motifs on top of photography · no text overlaying both motif and photography · no
flipping unless permitted · no outlines, strokes, effects or shadows · no merging motifs
· no cropping that obscures the recognisable form · no colours outside the palette · no
overusing one motif · no secondary colour without a primary.

## Photography

Four categories: **Community** (candid group interactions, ambition, collaboration) ·
**Place** (historic charm and modern energy, students engaging with the city, everyday
life beyond the classroom) · **Individuals** (portraits, space around the subject, softly
blurred backgrounds) · **Practice** (facilities and processes, editorial, action;
cool-toned light for tech and nursing, never yellow light or dated interiors).

Warm natural lighting, genuine unposed moments, outdoor prioritised, diverse mix of
students, de-cluttered spaces. Never stock-looking, never desk shots, never overcrowded,
never awkwardly cropped, no large third-party logos on clothing.

## Verified statistics (from the toolkit's own Open Day deck)

These are the only figures sourced from Winchester material — everything else in the
prototype is a `[STAT: ...]` placeholder and must stay one until the client verifies it.

- Top 10 for graduate employment; **92% of graduates in work or further study within 15
  months of graduating** (Unicompare, 2026)
- **2nd happiest place to live in the UK** (Rightmove, 2023) — the city of Winchester
- Educational journey framed as: Curiosity → Confidence → Capabilities

## Project state

**`Search and Discovery.dc.html`** — the search and discovery prototype. Parked as of
Sept 2026, to be folded into the look-and-feel concepts later. Contains: a 1280×800
device-framed homepage, a natural-language search modal wired to the Claude API over a
10-entry `knowledge` base with cited sources, Study Builder (five questions — who, what,
why, how, when) and the personalised results page it assembles from nine slice types.
Six prototype states are selectable from the bar above the frame.

**`motif-sprite.js`** — all brand motifs as a `<motif-svg name w h color>` web component.
Motifs take `currentColor`, so any concept can load this and colour them from tokens.
Names: `m-star`, `m-star4` (star with dots), `m-greenery`, `m-archway`, `m-stripes`,
`m-flower`, `m-lecture`, `m-chapel`, `m-westdowns`, `m-curved`, plus `i-*` UI icons.

**`assets/`** — Winchester photography (`ph-*.jpg`), the logo, the hero film poster.
Aston placeholders have all been removed.

Settled: palette tokens, type scale (H1 72 / H2 46 / H3 38 / 29 / 24, body 20/18/16/14),
the 5/10/15/20/30/40/60/80/100/120/157/196 spacing scale, square corners, borderless
buttons (dark purple on light grounds, lime on dark), light-purple hairlines.

Open: everything about look and feel — the concepts are free to break the above.

## Banked ideas (not built)

**Curved-frame wipe** — the curved frame sweeping across the viewport as a page or state
transition. It is the most recognisable element of the identity, and derived from the
star, so a curved sweep and a star aperture are the same gesture at different scales.
As a transition it becomes a signature rather than decoration. Pair with a
`prefers-reduced-motion` path where the reveal is simply the end state: with 50–60% of
students having a learning difference, that path is primary for a large part of the
audience, not a fallback.

## Reference applications

Open Day presentation is the gold-star reference deck. Brochures keep design simple and
use motifs as badges around statistics and pull quotes. Motifs work as dynamic windows
for video and as layered elements on CTA cards.

Contact for brand enquiries: design@winchester.ac.uk
