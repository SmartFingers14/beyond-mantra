'use client'

import { CursorFollower, ConstellationCursor } from '@/components/motion'

/**
 * ClientMotion — mounts all global client-side motion effects:
 *   • CursorFollower      (framer-motion spring dot)
 *   • ConstellationCursor (canvas stars + gold lines)
 *
 * RouteCurtain is handled separately in RouteCurtainWrapper
 * because it needs usePathname (also a client hook).
 */
export default function ClientMotion() {
    return (
        <>
            <CursorFollower />
            <ConstellationCursor />
        </>
    )
}
