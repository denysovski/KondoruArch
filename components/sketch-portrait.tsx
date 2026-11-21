export type SketchKind = 'long' | 'short' | 'glasses' | 'beard'

/**
 * Flat 2D portraits for the team cards: a head, shoulders and one defining
 * feature (long hair, short hair, glasses and a bun, a beard), drawn in the
 * site's navy ink over a pale blue disc. They are illustrations, not
 * likenesses of anyone.
 */
export function SketchPortrait({ kind, title }: { kind: SketchKind; title: string }) {
  const ink = '#06213f'
  const skin = '#f7f9fc'
  const shirt = kind === 'beard' ? '#bcd4ea' : kind === 'glasses' ? '#dde9f4' : '#eaf1f8'
  const disc = kind === 'short' || kind === 'beard' ? { cx: 128, cy: 84 } : { cx: 72, cy: 84 }

  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={title} className="sketch-portrait">
      <rect width="200" height="240" fill="#f5f8fb" />
      <circle cx={disc.cx} cy={disc.cy} r="48" fill="#bcd4ea" />
      <circle cx={disc.cx} cy={disc.cy} r="48" fill="none" stroke={ink} strokeWidth="1.5" strokeDasharray="3 5" />

      {/* hair that falls behind the head */}
      {kind === 'long' && (
        <path d="M58 98 C52 54 76 34 100 34 C126 34 150 54 142 100 L150 182 L50 182 Z" fill={ink} />
      )}
      {kind === 'glasses' && <circle cx="100" cy="40" r="16" fill={ink} />}

      {/* shoulders, collar */}
      <path
        d="M30 240 C30 190 60 168 100 168 C140 168 170 190 170 240"
        fill={shirt}
        stroke={ink}
        strokeWidth="2"
      />
      {kind === 'short' && (
        <path d="M86 170 L100 196 L114 170" fill="none" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      )}
      {kind === 'beard' && <path d="M82 172 L100 186 L118 172" fill="none" stroke={ink} strokeWidth="2" />}

      {/* neck and head */}
      <path d="M90 140 L90 170 L110 170 L110 140" fill={skin} stroke={ink} strokeWidth="2" />
      <ellipse cx="100" cy="104" rx="34" ry="42" fill={skin} stroke={ink} strokeWidth="2" />

      {/* hair and features in front */}
      {kind === 'long' && (
        <path
          d="M66 100 C68 70 84 60 100 60 C118 60 132 72 134 100 C120 86 104 78 84 82 C76 86 70 92 66 100 Z"
          fill={ink}
        />
      )}
      {kind === 'short' && (
        <path
          d="M64 104 C60 70 80 58 102 58 C124 58 140 72 136 106 C132 84 118 74 100 76 C86 78 74 86 70 110 Z"
          fill={ink}
        />
      )}
      {kind === 'glasses' && (
        <>
          <path
            d="M66 98 C66 72 82 60 100 60 C120 60 134 72 134 98 C126 80 74 80 66 98 Z"
            fill={ink}
          />
          <g fill="none" stroke={ink} strokeWidth="2.5">
            <circle cx="86" cy="106" r="11" />
            <circle cx="114" cy="106" r="11" />
            <path d="M97 106 L103 106" />
          </g>
        </>
      )}
      {kind === 'beard' && (
        <>
          <path d="M66 100 C64 82 70 72 78 68 L80 86 Z M134 100 C136 82 130 72 122 68 L120 86 Z" fill="#7ba7d4" />
          <path
            d="M68 112 C70 140 84 150 100 150 C116 150 130 140 132 112 C124 124 112 128 100 128 C88 128 76 124 68 112 Z"
            fill="#7ba7d4"
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M90 126 C96 122 104 122 110 126" fill="none" stroke={ink} strokeWidth="2" />
        </>
      )}

      {kind !== 'glasses' && (
        <g fill={ink}>
          <circle cx="88" cy="106" r="2.6" />
          <circle cx="112" cy="106" r="2.6" />
        </g>
      )}
      {kind !== 'beard' && (
        <path d="M92 128 C96 131 104 131 108 128" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}
