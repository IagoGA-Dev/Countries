"use client";

import 'chart.js/auto';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

async function fetchCountryDetails(countryIso2: string) {
    const response = await fetch(`http://localhost:3000/api/countries/${countryIso2}`);
    if (!response.ok) throw new Error('Failed to fetch country details');
    return await response.json();
}

export function LoadingCard() {
    return (
        <main className="h-screen flex items-center justify-center">
            <a className="text-4xl font-bold">Loading...</a>
        </main>
    )
}

export function ErrorCard({ error }: { error: string }) {
    return (
        <main className="h-screen flex items-center justify-center flex-col">
            <a className="text-4xl font-bold text-red-500">Error!</a>
            <p className="text-red-500">{error}</p>
        </main>
    )
}

export default function Country() {
    const { country } = useParams(); // Get the country from the URL path

    const [countryData, setCountryData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (country) {
            fetchCountryDetails(country as string)
                .then((data) => {
                    setCountryData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [country]);

    if (loading) return <LoadingCard />;
    if (error) return <ErrorCard error={error} />;

    const { countryInfo, population, flagUrl } = countryData;
    const borderCountries = countryInfo.borders || [];

    // Prepare population data for the chart
    const populationYears = population?.data?.populationCounts?.map((entry: any) => entry.year);
    const populationCounts = population?.data?.populationCounts?.map((entry: any) => entry.value);

    const populationChartData = {
        labels: populationYears,
        datasets: [
            {
                label: 'Population Over Time',
                data: populationCounts,
                borderColor: '#4A90E2',
                fill: false,
            },
        ],
    };

    return (
        <main className="max-w-7xl mx-auto p-6">
            {/* Country Name and Flag */}
            <section className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">{countryInfo.commonName}</h1>
                <img
                    src={flagUrl.data.flag}
                    alt={`${countryInfo.commonName} Flag`}
                    className="w-24 h-16 rounded shadow-lg"
                />
            </section>

            {/* Border Countries */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bordering Countries</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {borderCountries.map((borderCountry: any) => (
                        <li key={borderCountry.countryCode} className="bg-white rounded-lg shadow p-4 text-center">
                            <a
                                href={`/countries/${borderCountry.countryCode}`}
                                className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                {borderCountry.commonName}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Population Chart */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Population Over Time</h2>
                <div className="bg-white rounded-lg shadow p-6">
                    <Line data={populationChartData} />
                </div>
            </section>
        </main>
    );
}
