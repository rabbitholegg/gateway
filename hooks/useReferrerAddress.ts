import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { add, isPast } from "date-fns"
import { useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import Cookies from "js-cookie"
import { z } from "zod"
import { isValidAddress } from "@/lib"
import { isNotProduction } from "@/lib/constants"

export const REFERRER_PARAM = "wallet_ref"

const AddressWithExpirationSchema = z.tuple([z.string(), z.number()])

const referrerAddressStorage = createJSONStorage<string | null>(() => {
  return {
    getItem: (key) => {
      const result = Cookies.get(key)

      if (!result) {
        return null
      }

      try {
        const [address, expires] = AddressWithExpirationSchema.parse(
          JSON.parse(result)
        )

        // handle cases where cookies are not deleted when expired (not all browsers/settings respect this!)
        if (isPast(new Date(expires))) {
          return null
        }

        return address
      } catch (err) {
        return null
      }
    },
    setItem: (key, value) => {
      // encode the expiration time into the cookie value so we can enforce it whenever fetching it
      // since expired cookies are not always deleted automatically
      const expires = add(new Date(), { hours: 2 })
      const formattedValue = JSON.stringify([
        value.trim().toLowerCase().replace(/\n|\r/g, ""),
        expires.getTime(),
      ])
      return Cookies.set(key, formattedValue, {
        expires,
        secure: isNotProduction ? false : true,
        sameSite: "strict",
      })
    },
    removeItem: (key) => Cookies.remove(key),
  }
})

export const referrerAddressAtom = atomWithStorage<string | null>(
  "rh-referrer",
  null,
  referrerAddressStorage
)

/**
 * Reads `REFERRER_PARAM` from the query string and if it exists will set or update the `rh-referrer` cookie.
 * Downstream components can use `useAtomValue(referrerAddressAtom)` to read the value. This hook will run once
 * per page load.
 **/
export function useSetReferrerAddress() {
  const setReferrerAddress = useSetAtom(referrerAddressAtom)
  const router = useRouter()
  const pathname = usePathname()
  const query = useSearchParams()
  const [done, setDone] = useState(false)

  useEffect(() => {
    // We don't need to run this more than once per page load
    if (done) {
      return
    }

    const refParam = query.get('REFERRER_PARAM')
    const ref = Array.isArray(refParam)
      ? refParam[0]
      : refParam

    if (!ref || !isValidAddress(ref)) {
      return
    }

    setDone(true)

    const newParams = Object.fromEntries(query.entries());
    delete newParams[REFERRER_PARAM];

    const newQueryParams = new URLSearchParams(newParams).toString();
    const newUrl = `${pathname}?${newQueryParams}`;
    router.replace(newUrl);
    
    setReferrerAddress(ref)
  }, [query, pathname, router.replace, setReferrerAddress, done])
}
