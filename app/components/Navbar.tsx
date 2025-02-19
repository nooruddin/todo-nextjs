import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-gray-100">
      <div className="container mx-auto">
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
      </div>
    </nav>
  )
}
