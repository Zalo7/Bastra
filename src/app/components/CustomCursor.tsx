"use client"
import gsap from "gsap"
import React, { useEffect, useRef } from "react"

const CustomCursor = () => {
    const $follower = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const xTo = gsap.quickTo($follower.current, "x", {
                duration: 0.3,
                ease: "power2.out",
            })

            const yTo = gsap.quickTo($follower.current, "y", {
                duration: 0.3,
                ease: "power2.out",
            })

            const moveHandler = (e: MouseEvent) => {
                xTo(e.clientX)
                yTo(e.clientY)
            }

            window.addEventListener("mousemove", moveHandler)

            return () => window.removeEventListener("mousemove", moveHandler)
        })

        return () => ctx.revert()
    }, [])

    return (
        <>
            {/* Círculo difuso que sigue el cursor */}
            <div
                ref={$follower}
                className="pointer-events-none fixed left-0 top-0 z-50 aspect-square w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#edebdd] opacity-50 mix-blend-lighten blur-3xl will-change-transform transition-colors duration-300"
            ></div>
        </>
    )
}

export default CustomCursor
