"use client"

import { useEffect, useState } from "react"

function useCurrentTime() {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !time) {
    return new Date(0)
  }

  return time
}

function HourMarker({ hour, size = 400, isExcited = false, seed = 0 }: { hour: number; size?: number; isExcited?: boolean; seed?: number }) {
  const angle = (hour * 30 - 90) * (Math.PI / 180)
  const radius = size * 0.35
  const x = size / 2 + radius * Math.cos(angle)
  const y = size / 2 + radius * Math.sin(angle)
  const markerSize = size * 0.1
  // Rotate to face center: angle + 180 degrees (since shape points upward, we need to point toward center)
  const rotationAngle = (angle * (180 / Math.PI)) + 180
  
  // Generate extreme random pupil positions with high entropy (like the penises)
  const leftPupilRand1 = seededRandom(seed)
  const leftPupilRand2 = seededRandom(seed * 7 + 13)
  const leftPupilRand3 = seededRandom(seed * 11 + 23)
  const rightPupilRand1 = seededRandom(seed * 3 + 5)
  const rightPupilRand2 = seededRandom(seed * 17 + 31)
  const rightPupilRand3 = seededRandom(seed * 19 + 41)
  
  // Extreme movement - pupils can go to edges of eye whites
  const leftPupilOffsetX = ((leftPupilRand1 + leftPupilRand2) / 2 - 0.5) * markerSize * 0.12
  const leftPupilOffsetY = ((leftPupilRand2 + leftPupilRand3) / 2 - 0.5) * markerSize * 0.08
  const rightPupilOffsetX = ((rightPupilRand1 + rightPupilRand2) / 2 - 0.5) * markerSize * 0.12
  const rightPupilOffsetY = ((rightPupilRand2 + rightPupilRand3) / 2 - 0.5) * markerSize * 0.08

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotationAngle})`}>
      {/* Outer Labia - simplified almond shape */}
      <path
        d={`M 0 ${-markerSize * 0.6}
           Q ${markerSize * 0.4} ${-markerSize * 0.3} ${markerSize * 0.4} 0
           Q ${markerSize * 0.4} ${markerSize * 0.3} 0 ${markerSize * 0.6}
           Q ${-markerSize * 0.4} ${markerSize * 0.3} ${-markerSize * 0.4} 0
           Q ${-markerSize * 0.4} ${-markerSize * 0.3} 0 ${-markerSize * 0.6} Z`}
        fill="#ffb3d1"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Inner Labia - simpler inner shape */}
      <path
        d={`M 0 ${-markerSize * 0.4}
           Q ${markerSize * 0.25} ${-markerSize * 0.2} ${markerSize * 0.25} 0
           Q ${markerSize * 0.25} ${markerSize * 0.2} 0 ${markerSize * 0.4}
           Q ${-markerSize * 0.25} ${markerSize * 0.2} ${-markerSize * 0.25} 0
           Q ${-markerSize * 0.25} ${-markerSize * 0.2} 0 ${-markerSize * 0.4} Z`}
        fill="#ff99cc"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      
      {/* Vaginal Opening - visible dark ellipse */}
      <ellipse
        cx="0"
        cy={markerSize * 0.1}
        rx={markerSize * 0.1}
        ry={markerSize * 0.3}
        fill="#990033"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Clitoris - simple dot at top */}
      <circle
        cx="0"
        cy={-markerSize * 0.4}
        r={markerSize * 0.08}
        fill="#cc0066"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Face on the pussy */}
      <g>
        {/* Blush cheeks when excited */}
        {isExcited && (
          <>
            <ellipse
              cx={-markerSize * 0.3}
              cy={-markerSize * 0.2}
              rx={markerSize * 0.1}
              ry={markerSize * 0.08}
              fill="#ff69b4"
              opacity="0.6"
            />
            <ellipse
              cx={markerSize * 0.3}
              cy={-markerSize * 0.2}
              rx={markerSize * 0.1}
              ry={markerSize * 0.08}
              fill="#ff69b4"
              opacity="0.6"
            />
          </>
        )}
        
        {/* Eyes - wider when excited */}
        <ellipse
          cx={-markerSize * 0.15}
          cy={-markerSize * 0.5}
          rx={isExcited ? markerSize * 0.12 : markerSize * 0.08}
          ry={isExcited ? markerSize * 0.15 : markerSize * 0.1}
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="1"
        />
        <ellipse
          cx={markerSize * 0.15}
          cy={-markerSize * 0.5}
          rx={isExcited ? markerSize * 0.12 : markerSize * 0.08}
          ry={isExcited ? markerSize * 0.15 : markerSize * 0.1}
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Pupils - smaller when excited (wide-eyed look), with random positions */}
        <circle
          cx={-markerSize * 0.15 + leftPupilOffsetX}
          cy={-markerSize * 0.5 + leftPupilOffsetY}
          r={isExcited ? markerSize * 0.03 : markerSize * 0.04}
          fill="#000000"
        />
        <circle
          cx={markerSize * 0.15 + rightPupilOffsetX}
          cy={-markerSize * 0.5 + rightPupilOffsetY}
          r={isExcited ? markerSize * 0.03 : markerSize * 0.04}
          fill="#000000"
        />
        
        {/* Mouth - bigger smile when excited */}
        {isExcited ? (
          <>
            {/* Big excited smile */}
            <path
              d={`M ${-markerSize * 0.2} ${markerSize * 0.2} 
                 Q 0 ${markerSize * 0.4} ${markerSize * 0.2} ${markerSize * 0.2}`}
              fill="none"
              stroke="#ff0066"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Bigger tongue */}
            <ellipse
              cx="0"
              cy={markerSize * 0.35}
              rx={markerSize * 0.1}
              ry={markerSize * 0.15}
              fill="#ff69b4"
            />
          </>
        ) : (
          <>
            {/* Normal mouth */}
            <ellipse
              cx="0"
              cy={markerSize * 0.25}
              rx={markerSize * 0.12}
              ry={markerSize * 0.08}
              fill="#ff0066"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.8"
            />
            {/* Tongue sticking out */}
            <ellipse
              cx="0"
              cy={markerSize * 0.3}
              rx={markerSize * 0.06}
              ry={markerSize * 0.1}
              fill="#ff69b4"
            />
          </>
        )}
      </g>
    </g>
  )
}

// Simple pseudo-random function for deterministic randomness based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function PenisShape({ length, width, headSize, ballSize, color, isHappy = false, showSperm = false, seed = 0 }: { length: number; width: number; headSize: number; ballSize: number; color: string; isHappy?: boolean; showSperm?: boolean; seed?: number }) {
  // Drawing pointing along +X axis (to the right)
  const shaftLength = length - headSize
  
  // Smile curve - wider when happy
  const smileCurve = isHappy ? headSize * 0.5 : headSize * 0.35
  const smileStartX = isHappy ? -headSize * 0.4 : -headSize * 0.3
  const smileEndX = isHappy ? headSize * 0.4 : headSize * 0.3
  
  // Generate extreme random pupil positions with high entropy
  // Use multiple random values and combine them for more variation
  const leftPupilRand1 = seededRandom(seed)
  const leftPupilRand2 = seededRandom(seed * 7 + 13)
  const leftPupilRand3 = seededRandom(seed * 11 + 23)
  const rightPupilRand1 = seededRandom(seed * 3 + 5)
  const rightPupilRand2 = seededRandom(seed * 17 + 31)
  const rightPupilRand3 = seededRandom(seed * 19 + 41)
  
  // Extreme movement - pupils can go to edges of eye whites (90% of eye size)
  // Combine multiple random values for more entropy
  const leftPupilOffsetX = ((leftPupilRand1 + leftPupilRand2) / 2 - 0.5) * headSize * 0.22
  const leftPupilOffsetY = ((leftPupilRand2 + leftPupilRand3) / 2 - 0.5) * headSize * 0.16
  const rightPupilOffsetX = ((rightPupilRand1 + rightPupilRand2) / 2 - 0.5) * headSize * 0.22
  const rightPupilOffsetY = ((rightPupilRand2 + rightPupilRand3) / 2 - 0.5) * headSize * 0.16
  
  return (
    <g>
      {/* Testicles at base */}
      <circle 
        cx={-ballSize * 0.3} 
        cy={-ballSize * 0.8} 
        r={ballSize} 
        fill={color} 
        stroke={color} 
        strokeWidth="3"
        opacity="0.9"
      />
      <circle 
        cx={-ballSize * 0.3} 
        cy={ballSize * 0.8} 
        r={ballSize} 
        fill={color} 
        stroke={color} 
        strokeWidth="3"
        opacity="0.9"
      />
      
      {/* Shaft - cylindrical penis body */}
      <ellipse
        cx={shaftLength / 2}
        cy="0"
        rx={shaftLength / 2}
        ry={width / 2}
        fill={color}
        stroke={color}
        strokeWidth="2"
        opacity="0.95"
      />
      
      {/* Shaft outline for depth */}
      <path
        d={`M 0 ${-width/2} 
           Q ${shaftLength * 0.3} ${-width/2 * 0.9} ${shaftLength * 0.6} ${-width/2 * 0.7}
           L ${shaftLength} ${-width/2 * 0.8}
           L ${shaftLength} ${width/2 * 0.8}
           Q ${shaftLength * 0.6} ${width/2 * 0.7} ${shaftLength * 0.3} ${width/2 * 0.9}
           Q 0 ${width/2} 0 ${width/2} Z`}
        fill={color}
        stroke={color}
        strokeWidth="2.5"
        opacity="0.9"
      />
      
      {/* Glans (Head) - rounded and distinct */}
      <ellipse
        cx={length - headSize * 0.3}
        cy="0"
        rx={headSize * 0.9}
        ry={headSize * 0.7}
        fill={color}
        stroke={color}
        strokeWidth="3"
      />
      
      {/* Corona (ridge between shaft and glans) */}
      <path
        d={`M ${shaftLength} ${-width/2 * 0.8}
           Q ${shaftLength + headSize * 0.2} ${-headSize * 0.5} ${shaftLength + headSize * 0.4} 0
           Q ${shaftLength + headSize * 0.2} ${headSize * 0.5} ${shaftLength} ${width/2 * 0.8}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />

      {/* Sperm on glans head - only if showSperm is true */}
      {showSperm && (
        <g transform={`translate(${length}, 0)`}>
          {/* Single sperm coming out from the tip */}
          <g>
            {/* Sperm head */}
            <ellipse
              cx="0"
              cy="0"
              rx={headSize * 0.5}
              ry={headSize * 0.35}
              fill="#ffffff"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              opacity="0.95"
            />
            {/* Sperm tail */}
            <path
              d={`M ${-headSize * 0.5} 0 
                 Q ${-headSize * 1.2} ${-headSize * 0.25} ${-headSize * 2} 0
                 Q ${-headSize * 1.2} ${headSize * 0.25} ${-headSize * 0.5} 0`}
              fill="#ffffff"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              opacity="0.95"
            />
          </g>
        </g>
      )}

      {/* Face Details on Glans */}
      <g transform={`translate(${length - headSize * 0.5}, 0) rotate(90)`}>
        {/* Eyes - fixed positions */}
        <ellipse 
          cx={-headSize * 0.3} 
          cy={-headSize * 0.15} 
          rx={headSize * 0.12} 
          ry={headSize * 0.18} 
          fill="#ffffff" 
        />
        <ellipse 
          cx={headSize * 0.3} 
          cy={-headSize * 0.15} 
          rx={headSize * 0.12} 
          ry={headSize * 0.18} 
          fill="#ffffff" 
        />
        {/* Pupils - roll to different positions within the eye whites */}
        <circle 
          cx={-headSize * 0.3 + leftPupilOffsetX} 
          cy={-headSize * 0.15 + leftPupilOffsetY} 
          r={headSize * 0.06} 
          fill="#000000" 
        />
        <circle 
          cx={headSize * 0.3 + rightPupilOffsetX} 
          cy={-headSize * 0.15 + rightPupilOffsetY} 
          r={headSize * 0.06} 
          fill="#000000" 
        />
        
        {/* Mouth - flat line when not happy, smile when happy */}
        {isHappy ? (
          <>
            {/* Smile when happy */}
            <path
              d={`M ${smileStartX} ${headSize * 0.1} Q 0 ${smileCurve} ${smileEndX} ${headSize * 0.1}`}
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Tongue when smiling */}
            <ellipse
              cx="0"
              cy={headSize * 0.25}
              rx={headSize * 0.15}
              ry={headSize * 0.2}
              fill="#ff69b4"
            />
          </>
        ) : (
          /* Flat mouth when not happy */
          <line
            x1={-headSize * 0.3}
            y1={headSize * 0.1}
            x2={headSize * 0.3}
            y2={headSize * 0.1}
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </g>
    </g>
  )
}

function HourHand({ hours, minutes, seconds, size = 400 }: { hours: number; minutes: number; seconds: number; size?: number }) {
  const angle = (hours * 30 + minutes * 0.5 - 90)
  const length = size * 0.22
  const width = size * 0.08
  const headSize = size * 0.09
  const ballSize = size * 0.07
  const color = "#3b82f6" // Blue for hour hand
  // Unique seed for hour hand based on seconds
  const seed = seconds * 100 + 1

  return (
    <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
      <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} isHappy={true} seed={seed} />
    </g>
  )
}

function MinuteHand({ minutes, seconds, size = 400 }: { minutes: number; seconds: number; size?: number }) {
  const angle = (minutes * 6 + seconds * 0.1 - 90)
  const length = size * 0.32
  const width = size * 0.045
  const headSize = size * 0.07
  const ballSize = size * 0.05
  const color = "#ef4444" // Red for minute hand
  // Unique seed for minute hand based on seconds
  const seed = seconds * 100 + 2

  return (
    <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
      <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} isHappy={true} seed={seed} />
    </g>
  )
}

function SecondHand({ seconds, size = 400 }: { seconds: number; size?: number }) {
  const angle = (seconds * 6 - 90)
  const length = size * 0.32
  const width = size * 0.02
  const headSize = size * 0.04
  const ballSize = size * 0.03
  const color = "#10b981" // Green for second hand
  
  // Check if second hand is at a pussy marker (every 5 seconds = 12 positions)
  // Each pussy is at: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 seconds
  const isAtPussy = seconds % 5 === 0
  // Unique seed for second hand based on seconds
  const seed = seconds * 100 + 3
  
  // Calculate which pussy marker (hour position) the second hand is at
  let targetHour = 12
  if (isAtPussy) {
    targetHour = seconds / 5 === 0 ? 12 : seconds / 5
  }
  
  // Calculate positions
  const centerX = size / 2
  const centerY = size / 2
  const secondHandTipX = centerX + length * Math.cos(angle * (Math.PI / 180))
  const secondHandTipY = centerY + length * Math.sin(angle * (Math.PI / 180))
  
  // Calculate pussy marker position
  const pussyAngle = (targetHour * 30 - 90) * (Math.PI / 180)
  const pussyRadius = size * 0.35
  const pussyX = centerX + pussyRadius * Math.cos(pussyAngle)
  const pussyY = centerY + pussyRadius * Math.sin(pussyAngle)
  
  // Calculate direction from second hand tip to pussy
  const dx = pussyX - secondHandTipX
  const dy = pussyY - secondHandTipY
  const distance = Math.sqrt(dx * dx + dy * dy)
  const directionAngle = Math.atan2(dy, dx) * (180 / Math.PI)
  
  // Position sperm outside the head, along the path to pussy
  const spermOffset = headSize * 1.2 // Distance from head tip
  const spermX = secondHandTipX + (dx / distance) * spermOffset
  const spermY = secondHandTipY + (dy / distance) * spermOffset

  return (
    <>
      <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
        <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} isHappy={isAtPussy} showSperm={false} seed={seed} />
      </g>
      
      {/* Sperm going into pussy - only when at pussy marker */}
      {isAtPussy && (
        <g transform={`translate(${spermX}, ${spermY}) rotate(${directionAngle})`}>
          {/* Sperm head */}
          <ellipse
            cx="0"
            cy="0"
            rx={headSize * 0.5}
            ry={headSize * 0.35}
            fill="#ffffff"
            stroke="#d0d0d0"
            strokeWidth="1.5"
            opacity="0.95"
          />
          {/* Sperm tail - pointing toward pussy */}
          <path
            d={`M ${-headSize * 0.5} 0 
               Q ${-headSize * 1.2} ${-headSize * 0.25} ${-headSize * 2} 0
               Q ${-headSize * 1.2} ${headSize * 0.25} ${-headSize * 0.5} 0`}
            fill="#ffffff"
            stroke="#d0d0d0"
            strokeWidth="1.5"
            opacity="0.95"
          />
        </g>
      )}
    </>
  )
}

export function CustomClock({ size = 400 }: { size?: number }) {
  const time = useCurrentTime()
  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  
  // Determine which pussy marker is excited (when second hand reaches it)
  const isAtPussy = seconds % 5 === 0
  const excitedHour = isAtPussy ? (seconds / 5 === 0 ? 12 : seconds / 5) : null

  return (
    <div className="flex items-center justify-center p-8">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="text-foreground"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.45}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-20"
        />
        
        {Array.from({ length: 12 }, (_, i) => {
          const hour = i + 1
          const isExcited = excitedHour === hour
          // Unique seed for each pussy based on hour and seconds
          const seed = seconds * 100 + hour * 10
          return (
            <HourMarker key={hour} hour={hour} size={size} isExcited={isExcited} seed={seed} />
          )
        })}

        <HourHand hours={hours} minutes={minutes} seconds={seconds} size={size} />
        <MinuteHand minutes={minutes} seconds={seconds} size={size} />
        <SecondHand seconds={seconds} size={size} />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.02}
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

