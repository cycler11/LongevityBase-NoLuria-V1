import type { Vendor } from "@/lib/types"

interface VendorIconProps {
  vendor: Vendor
  className?: string
}

export function VendorIcon({ vendor, className = "h-4 w-4" }: VendorIconProps) {
  return <span className={className} title={vendor} />
}
