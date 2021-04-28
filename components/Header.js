import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full')
      } else {
        navRef.current.classList.remove('sticky-nav-full')
      }
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <div className="h-6">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="144px" height="144px"><rect width="32" height="26.486" x="8" y="3" fill="#ffd54f"/><rect width="32" height="7.843" x="8" y="29" fill="#e0e0e0"/><polygon fill="#bf360c" points="40,36 8,36 8,44 14.4,44 22.4,44 25.6,44 33.6,44 40,44"/><polygon fill="#f44336" points="21,29 27,29 24,32"/><polygon fill="#f44336" points="24,31 21,35 24,41 27,35"/><path fill="#3e2723" d="M32,22.806C32,21.256,30.806,20,29.333,20H18.667C17.194,20,16,21.256,16,22.806	c0,0.234,0.035,0.458,0.087,0.675c0.31,1.714,2.516,3.533,5.247,3.533c1.333,0,1.374,0,2.667,0c1.087,0,1.794,0,2.667,0	c2.667,0,4.919-1.721,5.247-3.533C31.965,23.264,32,23.04,32,22.806z"/><polygon fill="#fff" points="18,29 21,32 24,29"/><polygon fill="#fff" points="24,29 27,32 30,29"/><circle cx="18.5" cy="12.5" r="5.5" fill="#fff"/><circle cx="29.5" cy="12.5" r="5.5" fill="#fff"/><circle cx="18.5" cy="12.5" r="2.5" fill="#0288d1"/><path fill="#ff1744" d="M25.5,24c-0.828,0-1.5,0.675-1.5,1.507C24,24.675,23.328,24,22.5,24S21,24.675,21,25.507v1.507h1.5h3	H27v-1.507C27,24.675,26.328,24,25.5,24z"/><rect width="6" height="2" x="31" y="39" fill="#1a1a1a"/><rect width="6" height="2" x="11" y="39" fill="#1a1a1a"/><path fill="#ffab40" d="M10.98,8.5C10.98,6.416,9.732,4.66,8,4v9C9.732,12.34,10.98,10.584,10.98,8.5z"/><path fill="#ffab40" d="M37.793,24.507c0,1.385,0.988,2.507,2.207,2.507V22C38.781,22,37.793,23.122,37.793,24.507z"/><path fill="#ffab40" d="M24,12L24,12c-1.105,0-2,0.895-2,2v4h4v-4C26,12.895,25.105,12,24,12z"/><circle cx="18.5" cy="12.5" r=".5" fill="#1a1a1a"/><circle cx="29.5" cy="12.5" r="2.5" fill="#0288d1"/><circle cx="29.5" cy="12.5" r=".5" fill="#1a1a1a"/><circle cx="36.5" cy="6.5" r="1.5" fill="#ffab40"/><circle cx="36" cy="20" r="2" fill="#fff59d"/><circle cx="12" cy="20" r="2" fill="#fff59d"/><rect width="2" height="2" x="21" y="20" fill="#fff"/><rect width="2" height="2" x="25" y="20" fill="#fff"/></svg>
            </div>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
