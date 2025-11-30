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

function HourMarker({ hour, size = 400 }: { hour: number; size?: number }) {
  const angle = (hour * 30 - 90) * (Math.PI / 180)
  const radius = size * 0.35
  const x = size / 2 + radius * Math.cos(angle)
  const y = size / 2 + radius * Math.sin(angle)
  const markerSize = size * 0.1
  // Rotate to face center: angle + 180 degrees (since shape points upward, we need to point toward center)
  const rotationAngle = (angle * (180 / Math.PI)) + 180

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
    </g>
  )
}

function PenisShape({ length, width, headSize, ballSize, color }: { length: number; width: number; headSize: number; ballSize: number; color: string }) {
  // Drawing pointing along +X axis (to the right)
  const shaftLength = length - headSize
  
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

      {/* Face Details on Glans */}
      <g transform={`translate(${length - headSize * 0.5}, 0) rotate(90)`}>
        {/* Eyes */}
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
        <circle cx={-headSize * 0.3} cy={-headSize * 0.15} r={headSize * 0.06} fill="#000000" />
        <circle cx={headSize * 0.3} cy={-headSize * 0.15} r={headSize * 0.06} fill="#000000" />
        
        {/* Smile */}
        <path
          d={`M ${-headSize * 0.3} ${headSize * 0.1} Q 0 ${headSize * 0.35} ${headSize * 0.3} ${headSize * 0.1}`}
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Tongue */}
        <ellipse
          cx="0"
          cy={headSize * 0.25}
          rx={headSize * 0.15}
          ry={headSize * 0.2}
          fill="#ff69b4"
        />
      </g>
    </g>
  )
}

function HourHand({ hours, minutes, size = 400 }: { hours: number; minutes: number; size?: number }) {
  const angle = (hours * 30 + minutes * 0.5 - 90)
  const length = size * 0.28
  const width = size * 0.055
  const headSize = size * 0.08
  const ballSize = size * 0.06
  const color = "#3b82f6" // Blue for hour hand

  return (
    <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
      <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} />
    </g>
  )
}

function MinuteHand({ minutes, seconds, size = 400 }: { minutes: number; seconds: number; size?: number }) {
  const angle = (minutes * 6 + seconds * 0.1 - 90)
  const length = size * 0.38
  const width = size * 0.045
  const headSize = size * 0.07
  const ballSize = size * 0.05
  const color = "#ef4444" // Red for minute hand

  return (
    <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
      <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} />
    </g>
  )
}

function SecondHand({ seconds, size = 400 }: { seconds: number; size?: number }) {
  const angle = (seconds * 6 - 90)
  const length = size * 0.32
  const width = size * 0.035
  const headSize = size * 0.055
  const ballSize = size * 0.04
  const color = "#10b981" // Green for second hand

  return (
    <g transform={`translate(${size/2}, ${size/2}) rotate(${angle})`}>
      <PenisShape length={length} width={width} headSize={headSize} ballSize={ballSize} color={color} />
    </g>
  )
}

export function CustomClock({ size = 400 }: { size?: number }) {
  const time = useCurrentTime()
  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

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
        
        {Array.from({ length: 12 }, (_, i) => (
          <HourMarker key={i + 1} hour={i + 1} size={size} />
        ))}

        <HourHand hours={hours} minutes={minutes} size={size} />
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

