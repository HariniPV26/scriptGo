'use client'

import { useEffect, useState } from 'react'

export function CursorGlow() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                setMousePos({ x: e.clientX, y: e.clientY })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    if (isMobile) return null

    return (
        <div
            className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-1000"
            style={{
                background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.1), transparent 80%)`
            }}
        />
    )
}
