import Image from 'next/image'
import NavBar from './components/navbar/navbar'
import ProductList from './components/products/productlist'

export default function Home() {
  return (
    <main className="min-h-screen min-w-mobile">
      <ProductList/>
    </main>
  )
}
