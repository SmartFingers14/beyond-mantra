'use client'

import { usePathname } from 'next/navigation'
import { RouteCurtain } from '@/components/motion'

/** Wraps RouteCurtain with the current pathname as the routeKey */
export default function RouteCurtainWrapper() {
    const pathname = usePathname()
    return <RouteCurtain routeKey={pathname} />
}
