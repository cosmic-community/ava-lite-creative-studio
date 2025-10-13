import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-black">AVA Lite</h3>
            <p className="text-gray-600 mb-4"> {/* Changed: Medium gray text */}
              Documenting and empowering Africa's creative generation through editorial features, 
              creative services, and authentic storytelling.
            </p>
            <a 
              href="https://instagram.com/avalite2025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-orange-600 transition-colors font-medium" {/* Changed: Orange with darker hover */}
            >
              @avalite2025
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-accent transition-colors"> {/* Changed: Gray text, orange hover */}
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-accent transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-600 hover:text-accent transition-colors">
                  Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-black">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://instagram.com/avalite2025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-accent transition-colors" {/* Changed: Gray text, orange hover */}
                >
                  Instagram
                </a>
              </li>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center"> {/* Changed: Light border */}
          <p className="text-gray-500"> {/* Changed: Medium gray text */}
            © {currentYear} AVA Lite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}