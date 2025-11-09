import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <h1><Link to="/">Doggy Daycare</Link></h1>
          <nav>
            <Link to="/catalog">Katalog</Link>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  )
}