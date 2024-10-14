export function HeaderBar() {
    return (
        <header>
            <button className="relative inline-block px-6 py-3 border-2 border-white text-white uppercase font-semibold text-lg transition duration-300">
                <a href="#" className="relative">
                    <span className="relative z-10">HELLO !</span>
                </a>
                <div className="absolute inset-0 -top-0.5 -left-0.5 w-full h-full bg-gray-800 transition-transform duration-300 transform scale-y-100 before-effect"></div>
                <div className="absolute inset-0 -top-0.5 -left-0.5 w-full h-full bg-gray-800 transition-transform duration-300 transform scale-y-100 after-effect"></div>
            </button>
        </header>
    )
}