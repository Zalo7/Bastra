import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar' 
import Footer from './components/Footer'


export const metadata: Metadata = {
  title: 'Bastra Studio',
  description: 'Agencia de marketing y contenido',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}