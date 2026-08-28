import { useEffect } from "react"

type SEOProps = {
  title: string
  description: string
  path?: string
}

const siteName = "Tanho Restaurant"
const fallbackOrigin = "https://tanho.uz"

export default function SEO({ title, description, path = "/" }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
    document.title = fullTitle

    const setMeta = (selector: string, content: string, attribute: "name" | "property" = "name") => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`)
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute(attribute, selector)
        document.head.appendChild(element)
      }
      element.content = content
    }

    const origin = window.location.origin || fallbackOrigin
    const canonicalUrl = `${origin}${path}`
    setMeta("description", description)
    setMeta("og:title", fullTitle, "property")
    setMeta("og:description", description, "property")
    setMeta("og:url", canonicalUrl, "property")
    setMeta("twitter:title", fullTitle)
    setMeta("twitter:description", description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [title, description, path])

  return null
}
