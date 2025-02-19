'use client'

import { useParams } from 'next/navigation'

export default function Todo() {
  const { id } = useParams()
  return (
    <main className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo #{id}</h1>
      <a href="/todos" className="text-blue-500 hover:underline">
        Go Back to Todos List
      </a>
    </main>
  )
}
