export function HeaderBar() {
    return (
    <header className="bg-gray-900 p-2 rounded-xl text-center">
        <div className=" text-center">
            
            <button className="bg-gray-800 rounded-xl inline-block px-4 hover:bg-gray-500 hover:text-black">Build</button>
            <button className="bg-gray-800 rounded-xl inline-block px-4 hover:bg-gray-500 hover:text-black ml-10">Employee</button>

            <input type="text"
                className="px-2 w-80 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-10" 
                placeholder="Pesquisar..." 
            />
            <button 
                type="submit" 
                className="px-4 bg-gray-800 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition">
                Pesquisar
            </button>
        </div>
    </header>
    )
}