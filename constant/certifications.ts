import type { StaticImageData } from "next/image"
import type { IconType } from "react-icons"
import { SiAndela, SiFreecodecamp } from "react-icons/si"

import sampleLeadership from "@/assets/image/certificates/sample-leadership.png"
import sampleJavascript from "@/assets/image/certificates/sample-javascript.png"

export type Issuer = {
  /** Must match the `issuer` text used on certificates (it is the lookup key). */
  name: string
  /** Logo file imported from @/assets/image, e.g. import logo from "@/assets/image/issuers/andela.png". Wins over `icon`. */
  logo?: StaticImageData
  /** Brand icon from react-icons (used when you have no logo file). */
  icon?: IconType
  /** Issuer website; shown as a link on the card. */
  url?: string
}

/*
 * ISSUERS: add every organisation that has issued you a certificate, once, with its logo.
 * Every certificate whose `issuer` matches `name` picks up the logo automatically.
 * Issuers not listed here still work; they just show their first letter instead of a logo.
 */
export const ISSUERS: Issuer[] = [
  { name: "Andela", icon: SiAndela, url: "https://www.andela.com" },
  { name: "freeCodeCamp", icon: SiFreecodecamp, url: "https://www.freecodecamp.org" },
]

export function getIssuer(name: string): Issuer {
  return ISSUERS.find((issuer) => issuer.name === name) ?? { name }
}

export type Certificate = {
  title: string
  issuer: string
  /** ISO month the certificate was issued, e.g. "2024-09". Used for sorting and display. */
  issued: string
  /** Optional: expiry month in the same format. Leave out if it never expires. */
  expires?: string
  location?: string
  /** Certificate image or issuer logo shown at the top of the card. Import it from @/assets/image. */
  image?: StaticImageData
  /** "cover" fills the image area (certificate scans); "contain" (default) pads a logo. */
  imageFit?: "cover" | "contain"
  /** Short summary of what the programme covered. */
  description?: string
  /** Skills or topics learned; shown as small tags. */
  skills?: string[]
  /** File people can download (PDF or image). Put it in public/certificates/ and use "/certificates/name.pdf". Adds a download button on hover. */
  downloadUrl?: string
  /** Credential / certificate ID, if the issuer gives one. */
  credentialId?: string
  /** Link where anyone can verify the certificate. Adds a "View credential" button. */
  credentialUrl?: string
}

/*
 * HOW TO ADD A CERTIFICATE
 * Copy the template below into CERTIFICATES, fill in what you have and delete the rest.
 * Only title, issuer and issued are required; the card adapts to whatever you provide.
 *
 *   {
 *     title: "Certificate name",
 *     issuer: "Issuing organisation",
 *     issued: "2025-03",
 *     expires: "2028-03",
 *     image: myCertificateImage, // import myCertificateImage from "@/assets/image/certificates/my-cert.png"
 *     imageFit: "cover",
 *     location: "Kigali, Rwanda",
 *     description: "One or two sentences about what it covers.",
 *     skills: ["Skill one", "Skill two"],
 *     credentialId: "ABC-123",
 *     credentialUrl: "https://issuer.com/verify/ABC-123",
 *     downloadUrl: "/certificates/my-cert.pdf", // file lives in public/certificates/
 *   },
 */
export const CERTIFICATES: Certificate[] = [
  {
    title: "Andela Technical Leadership",
    issuer: "Andela",
    issued: "2024-09",
    location: "Kigali, Rwanda",
    // TEST DATA: sample image, file and link. Replace with your real certificate.
    image: sampleLeadership,
    imageFit: "cover",
    description: "Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure  Sample description for testing the card layout. hello this is the testing words but actualy i don't know what to write for sure",
    skills: ["Technical leadership"],
    credentialId: "TEST-0001",
    credentialUrl: "https://example.com/verify/TEST-0001",
    downloadUrl: "/certificates/sample-leadership.pdf",
  },
  {
    title: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issued: "2023-09",
    // TEST DATA: sample image and file. Replace with your real certificate.
    image: sampleJavascript,
    imageFit: "cover",
    downloadUrl: "/certificates/sample-javascript.pdf",
    description: "Sample description for testing the card layout.",
    skills: ["JavaScript", "Algorithms", "Data structures"],
  },
]

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

export function formatMonth(value: string): string {
  return monthFormat.format(new Date(`${value}-01T00:00:00Z`))
}

export function sortedCertificates(): Certificate[] {
  return [...CERTIFICATES].sort((a, b) => b.issued.localeCompare(a.issued))
}
