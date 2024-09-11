async function getCountries() {
    const response = await fetch('http://localhost:3000/api/countries');
    const data = await response.json();
    return data;
}

export default async function Countries() {
    const countries = await getCountries();

    return (
        <main className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Available Countries</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.map((country: { name: string; }) => (
                    <li
                        key={country.name}
                        className="bg-white rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl p-6"
                    >
                        <a
                            href={`/countries/${country.name}`}
                            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            {country.name}
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    );
}
