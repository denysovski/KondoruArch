/* ------------------------------------------------------------------ *
 * The single catalogue of every photograph on the site.
 *
 *   key    where the image ends up: public/img/<key>-<width>.webp
 *   remote where the master came from, so images:ingest can refetch it
 *   alt    the default alt text — components fall back to this, so alt
 *          text is written once, next to the picture it describes
 *
 * Alt text describes what is actually in the frame, never a repeat of the
 * caption or the heading sitting next to it.
 * ------------------------------------------------------------------ */

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=88`

export const images = [
  /* --- Architecture: whole buildings, the studio's own work --------- */
  {
    key: 'architecture/hero-facade',
    max: 2000,
    alt: 'Angled white louvre panels planted with shrubs across the face of an apartment building',
  },
  {
    key: 'architecture/atrium-garden',
    max: 2000,
    alt: 'Glazed atrium running the length of a building, its balconies lined with climbing greenery',
  },
  {
    key: 'architecture/curved-balconies',
    max: 2000,
    alt: 'Curved glass office block with planting spilling over every balcony edge',
  },
  {
    key: 'architecture/glass-terraces',
    alt: 'Corner of a glass tower with planted terraces stepping down each storey',
  },
  {
    key: 'architecture/green-campus',
    max: 2000,
    alt: 'Aerial view of a glazed campus building wrapped in landscaped roof gardens',
  },
  {
    key: 'architecture/green-wall-tower',
    max: 2000,
    alt: 'Concrete tower rising behind a stepped living wall of dense planting',
  },
  {
    key: 'architecture/layered-block',
    max: 2000,
    alt: 'Pale layered concrete office block cutting into a clear blue sky',
  },
  {
    key: 'architecture/louvre-facade',
    max: 2000,
    alt: 'White louvre panels tilted across a facade, each one planted with flowering shrubs',
  },
  {
    key: 'architecture/office-terrace',
    max: 2000,
    alt: 'Office tower with deep planted terraces carried on rounded concrete columns',
  },
  {
    key: 'architecture/planted-tower',
    alt: 'Residential tower with trees and shrubs growing on every balcony',
  },
  {
    key: 'architecture/round-courtyard',
    alt: 'Looking down into a circular white courtyard with a planted green centre',
  },
  {
    key: 'architecture/terrace-columns',
    alt: 'Slim columns holding up heavily planted terraces above a shaded walkway',
  },
  {
    key: 'architecture/timber-corner',
    max: 2000,
    alt: 'Timber-clad corner of an apartment block under a thick green roof',
  },
  {
    key: 'architecture/twin-towers',
    max: 2000,
    alt: 'Two planted roof terraces seen from below against a bright blue sky',
  },
  {
    key: 'architecture/vertical-forest',
    alt: 'Tree-covered residential tower framed by white blossom',
  },
  {
    key: 'architecture/white-block',
    alt: 'White apartment block with deep recessed balconies and dark glazing',
  },

  /* --- Places: the destination panel under the hero ----------------- */
  {
    key: 'places/villa-pool-palms',
    remote: unsplash('1512917774080-9991f1c4c750'),
    alt: 'Single-storey white villa beside a turquoise pool, screened by palms and olive trees',
  },
  {
    key: 'places/timber-house-pines',
    remote: unsplash('1449844908441-8829872d2607'),
    alt: 'Dark red timber house at the edge of a pine wood, lit by low morning sun',
  },
  {
    key: 'places/white-villa-pool',
    remote: unsplash('1600596542815-ffad4c1539a9'),
    alt: 'Modern white villa stepping down to a long swimming pool on a clear day',
  },

  /* --- People: the four partners ------------------------------------ */
  {
    key: 'people/portrait-amina-belhaj',
    max: 800,
    remote: unsplash('1494790108377-be9c29b29330'),
    alt: 'Amina Belhaj, founding partner, smiling in a red roll-neck jumper',
  },
  {
    key: 'people/portrait-jonas-vik',
    max: 800,
    remote: unsplash('1500648767791-00dcc994a43e'),
    alt: 'Jonas Vik, head of acquisitions, in a grey jumper against a plain wall',
  },
  {
    key: 'people/portrait-clara-mendes',
    max: 800,
    remote: unsplash('1517841905240-472988babdf9'),
    alt: 'Clara Mendes, design director, in a denim jacket in front of a teal wall',
  },
  {
    key: 'people/portrait-tomas-reiner',
    max: 800,
    remote: unsplash('1531123897727-8f129e1688ce'),
    alt: 'Tomas Reiner, delivery lead, photographed against a deep red wall',
  },

  /* --- Features: the research slider -------------------------------- */
  {
    key: 'features/curved-striped-tower',
    max: 2000,
    remote: unsplash('1518005020951-eccb494ad742'),
    alt: 'Two curved towers banded in blue and white, seen looking straight up between them',
  },
  {
    key: 'features/glass-towers-sky',
    max: 2000,
    remote: unsplash('1511818966892-d7d671e672a2'),
    alt: 'Dark glass office towers converging overhead under a heavy grey sky',
  },
  {
    key: 'features/architect-drawing-plans',
    max: 2000,
    remote: unsplash('1503387762-592deb58ef4e'),
    alt: 'An architect drawing a floor plan by hand on a drafting table',
  },

  /* --- Exteriors: whole houses, used across the listings ------------ */
  {
    key: 'exteriors/timber-clad-house-lawn',
    remote: unsplash('1600047509807-ba8f99d2cdde'),
    alt: 'House clad in red timber and grey panels, with a stepping-stone path across the lawn',
  },
  {
    key: 'exteriors/timber-and-black-house',
    remote: unsplash('1600566753190-17f0baa2a6c3'),
    alt: 'House clad in pale timber and black boarding behind a low garden wall',
  },
  {
    key: 'exteriors/courtyard-house-under-tree',
    remote: unsplash('1600585154340-be6161a56a0c'),
    alt: 'Dark timber courtyard house wrapped around a mature eucalyptus tree',
  },
  {
    key: 'exteriors/dark-clad-entrance',
    remote: unsplash('1600585154526-990dced4db0d'),
    alt: 'Entrance to a dark-clad house, the doorway lined in warm vertical timber',
  },
  {
    key: 'exteriors/poolside-glass-terrace',
    remote: unsplash('1600573472550-8090b5e0745e'),
    alt: 'Glazed terrace with slim steel columns looking out over a small swimming pool',
  },

  /* --- Interiors: rooms, used across the listings ------------------- */
  {
    key: 'interiors/clerestory-window-lounge',
    remote: unsplash('1618221195710-dd6b41faaea6'),
    alt: 'Living room with a grey sofa, leather ottomans and a long clerestory window onto trees',
  },
  {
    key: 'interiors/neutral-sectional-salon',
    remote: unsplash('1616486338812-3dadae4b4ace'),
    alt: 'Pale sitting room with a deep sectional sofa, round timber table and a wall clock',
  },
  {
    key: 'interiors/teal-accent-lounge',
    remote: unsplash('1560448204-e02f11c3d0e2'),
    alt: 'Open lounge with teal cushions, a fireplace and windows onto the rooftops beyond',
  },
  {
    key: 'interiors/pendant-lit-dining-room',
    remote: unsplash('1560185007-cde436f6a4d0'),
    alt: 'Dining table under amber glass pendants, opening into a sitting area beyond',
  },
  {
    key: 'interiors/herringbone-living-room',
    remote: unsplash('1493809842364-78817add7ffb'),
    alt: 'Bright room with herringbone parquet, a blue sofa and a long white sideboard',
  },
  {
    key: 'interiors/brick-loft-dining',
    remote: unsplash('1505873242700-f289a29e1e0f'),
    alt: 'Warehouse loft with exposed brick, industrial pendant lamps and a long dining table',
  },
  {
    key: 'interiors/plant-filled-living-room',
    remote: unsplash('1502672260266-1c1ef2d93688'),
    alt: 'Sunlit living room full of houseplants, with a grey sofa and a bentwood chair',
  },
  {
    key: 'interiors/white-kitchen-dark-splashback',
    remote: unsplash('1484154218962-a197022b5858'),
    alt: 'White fitted kitchen with a dark tiled splashback and a stool at the island',
  },
  {
    key: 'interiors/minimal-navy-sofa-room',
    remote: unsplash('1513694203232-719a280e022f'),
    alt: 'Sparse white room with a navy two-seat sofa, a mirrored chest and a potted olive tree',
  },
  {
    key: 'interiors/timber-stair-atrium',
    remote: unsplash('1502005229762-cf1b2da7c5d6'),
    alt: 'Double-height hall with an open timber and steel stair under brass pendant lights',
  },
  {
    key: 'interiors/white-tiled-bathroom',
    remote: unsplash('1560448075-bb485b067938'),
    alt: 'White tiled bathroom with a pedestal basin, round mirror and a bath under the window',
  },
  {
    key: 'interiors/red-armchair-apartment',
    remote: unsplash('1522708323590-d24dbb6b0267'),
    alt: 'Apartment living and dining space with a red armchair and tall windows onto the street',
  },
  {
    key: 'interiors/corner-window-lounge',
    remote: unsplash('1567767292278-a4f21aa2d36e'),
    alt: 'Corner living room with a grey sectional, a glass coffee table and two tall windows',
  },
  {
    key: 'interiors/sage-wall-sofa',
    remote: unsplash('1583847268964-b28dc8f51f92'),
    alt: 'Sitting room with a pale sofa against a sage wall and two round timber tables',
  },
  {
    key: 'interiors/yellow-armchair-corner',
    remote: unsplash('1586023492125-27b2c045efd7'),
    alt: 'Quiet corner with a mustard armchair, a brass floor lamp and a framed print on oak boards',
  },
  {
    key: 'interiors/coffered-ceiling-salon',
    remote: unsplash('1598928506311-c55ded91a20c'),
    alt: 'Formal salon with a coffered ceiling, marble fireplace and built-in display shelves',
  },
  {
    key: 'interiors/grey-family-living-room',
    remote: unsplash('1600121848594-d8644e57abab'),
    alt: 'Family living room in greys, with a corner sofa and shelving either side of the window',
  },
  {
    key: 'interiors/gallery-wall-loft',
    remote: unsplash('1600210492486-724fe5c67fb0'),
    alt: 'Loft living room with a framed gallery wall, a tan leather sofa and large houseplants',
  },
  {
    key: 'interiors/timber-ceiling-terrace',
    remote: unsplash('1600210492493-0946911123ea'),
    alt: 'Lounge under a slatted timber ceiling, opening through full-height glass onto a terrace',
  },
  {
    key: 'interiors/dark-stone-bathroom',
    remote: unsplash('1600566752355-35792bedcfea'),
    alt: 'Dark stone bathroom with a freestanding tub and a long window above the vanity',
  },
  {
    key: 'interiors/open-stair-family-room',
    remote: unsplash('1600566753086-00f18fb6b3ea'),
    alt: 'Family room with a blue sofa beneath an open timber stair, a dog asleep on the rug',
  },
  {
    key: 'interiors/concrete-stair-dining',
    remote: unsplash('1600607687920-4e2a09cf159d'),
    alt: 'Dining table beside a black steel stair against a board-marked concrete wall',
  },
  {
    key: 'interiors/skylight-open-plan-kitchen',
    remote: unsplash('1600607687939-ce8a6c25118c'),
    alt: 'Open-plan kitchen and living space lit by a long skylight over the island',
  },
  {
    key: 'interiors/rattan-pendant-lounge',
    remote: unsplash('1615529182904-14819c35db37'),
    alt: 'Living room with woven rattan pendants, a pale sofa and a patterned rug',
  },
]

/** Every key in the catalogue, for scripts that validate against it. */
export const imageKeys = images.map((image) => image.key)

/** The master file in assets/source for a catalogue entry. */
export const sourceFile = (image) => `${image.key.split('/').pop()}.jpg`
