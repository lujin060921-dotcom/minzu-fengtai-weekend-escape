const INK = '#3346A0'

export function StarDoodle({ className = '', fill = '#FFB7CF', face = false }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 7C53 7 55 9 56 13L62 33C63 35 64 36 66 37L86 42C93 44 94 50 88 54L71 66C69 67 69 69 69 71L72 91C72 98 67 101 61 97L47 87C45 85 43 85 41 86L26 93C20 96 15 92 17 85L23 66C24 64 23 62 21 61L7 50C2 46 4 40 10 38L29 33C31 33 32 31 33 29L38 12C40 5 46 4 50 7Z"
        fill={fill}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {face ? (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
          <circle cx="40" cy="48" r="3" fill={INK} stroke="none" />
          <circle cx="60" cy="48" r="3" fill={INK} stroke="none" />
          <path d="M43 58C47 63 54 63 58 58" />
          <path d="M30 56C30 56 30 56 30 56" opacity="0" />
        </g>
      ) : null}
    </svg>
  )
}

export function HeartDoodle({ className = '', fill = '#FF8FB4' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 88C22 70 10 52 18 36C25 22 42 24 50 37C58 24 75 22 82 36C90 52 78 70 50 88Z"
        fill={fill}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M30 40C33 34 39 34 42 38"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

export function Sparkle({ className = '', fill = '#FFE9A8' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 5C53 27 58 33 82 50C58 67 53 73 50 95C47 73 42 67 18 50C42 33 47 27 50 5Z"
        fill={fill}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Squiggle({ className = '', color = '#FF8FB4' }) {
  return (
    <svg viewBox="0 0 130 86" className={className} aria-hidden="true">
      <path
        d="M8 62C18 22 52 12 64 32C73 47 58 61 48 52C39 44 49 32 60 38C76 47 81 71 120 66"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CloudDoodle({ className = '', fill = '#FFFDF8' }) {
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden="true">
      <path
        d="M34 74C17 74 8 63 12 51C16 39 28 36 37 41C39 26 51 18 64 22C75 7 98 9 104 27C121 26 132 37 130 51C128 66 115 74 99 74Z"
        fill={fill}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CurvyArrow({ className = '' }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <path
        d="M8 20C40 5 82 12 94 45C97 54 96 62 92 68"
        fill="none"
        stroke={INK}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M78 60C85 64 89 69 92 70C94 64 98 58 103 54"
        fill="none"
        stroke={INK}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BusMascot({ className = '' }) {
  return (
    <svg viewBox="0 0 300 230" className={className} aria-hidden="true">
      {/* 地面阴影 */}
      <ellipse cx="152" cy="207" rx="112" ry="12" fill="#C9B6F5" opacity="0.45" />

      {/* 车顶小旗与天线 */}
      <g stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M92 48V22" fill="none" />
        <path d="M92 22C106 14 118 18 122 28C116 34 104 36 92 32Z" fill="#FFE9A8" />
        <path d="M252 106C260 96 276 96 280 108" fill="none" stroke="#FF8FB4" />
      </g>

      {/* 车体 */}
      <g stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <rect x="38" y="46" width="216" height="142" rx="38" fill="#FFB7CF" />
        {/* 车顶高光 */}
        <path
          d="M62 64C94 52 188 52 226 62"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="8"
          opacity="0.65"
        />
        {/* 挡风玻璃 */}
        <rect x="55" y="76" width="92" height="60" rx="20" fill="#E6F0FA" />
        <path
          d="M68 88C78 81 92 80 102 82"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.9"
        />
        {/* 车窗 */}
        <rect x="158" y="76" width="42" height="60" rx="15" fill="#E6F0FA" />
        <rect x="208" y="76" width="32" height="60" rx="13" fill="#C9F0DF" />
        {/* 车灯 / 表情 */}
        <circle cx="78" cy="101" r="4.5" fill={INK} stroke="none" />
        <circle cx="121" cy="101" r="4.5" fill={INK} stroke="none" />
        <path d="M89 114C95 120 104 120 110 114" fill="none" />
        <ellipse cx="68" cy="114" rx="7" ry="4" fill="#FF8FB4" stroke="none" opacity="0.7" />
        <ellipse cx="132" cy="114" rx="7" ry="4" fill="#FF8FB4" stroke="none" opacity="0.7" />
        {/* 车头保险杠 */}
        <rect x="38" y="150" width="216" height="30" rx="15" fill="#FFE9A8" />
        <path d="M58 165H238" fill="none" stroke={INK} strokeWidth="4" opacity="0.35" />
        {/* 车门 */}
        <path d="M158 144V124" fill="none" />
        <path d="M232 144V124" fill="none" />
      </g>

      {/* 车轮 */}
      <g stroke={INK} strokeWidth="5">
        <circle cx="94" cy="186" r="22" fill={INK} />
        <circle cx="94" cy="186" r="9" fill="#FFFDF8" />
        <circle cx="222" cy="186" r="22" fill={INK} />
        <circle cx="222" cy="186" r="9" fill="#FFFDF8" />
      </g>

      {/* 车身贴纸 */}
      <g transform="translate(172 88) rotate(8)">
        <path
          d="M16 0C19 0 20 2 21 5L24 14C25 16 25 16 27 17L36 20C39 21 39 25 36 26L28 31C26 32 26 32 26 34L27 43C27 47 24 48 21 46L14 41C12 40 12 40 10 41L3 45C0 47-3 45-2 42L0 33C0 31 0 31-1 30L-8 24C-10 22-9 18-6 17L3 14C5 13 5 13 6 11L8 3C9 0 13-1 16 0Z"
          fill="#FFE9A8"
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      {/* 爱心贴纸 */}
      <g transform="translate(54 148)">
        <path
          d="M15 26C3 18-2 10 2 3C5-3 12-2 15 3C18-2 25-3 28 3C32 10 27 18 15 26Z"
          fill="#FFFDF8"
          stroke={INK}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>

      {/* 目的地牌 */}
      <g stroke={INK} strokeWidth="4">
        <rect x="156" y="13" width="86" height="32" rx="12" fill="#FFF7CC" />
        <text
          x="199"
          y="35"
          textAnchor="middle"
          fill={INK}
          fontSize="15"
          fontFamily="ZCOOL KuaiLe, YouYuan, sans-serif"
          stroke="none"
        >
          去城里
        </text>
      </g>

      {/* 速度线 */}
      <g stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.2">
        <path d="M8 92H28" />
        <path d="M2 110H20" />
        <path d="M10 128H24" />
      </g>
    </svg>
  )
}
