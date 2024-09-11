import express from 'express';
const router = express.Router();

// Route to get all available countries
router.get('/', async (req, res) => {
    try {
        // Fetch available countries 
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
});

// Route to get details for a specific country
router.get('/:country', async (req, res) => {
    const countryIso2 = req.params.country;
    try {
        // Fetch country info 
        const countryInfoResponse = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryIso2}`);
        if (!countryInfoResponse.ok) return res.status(404).json({ error: 'Country not found' });
        
        const countryInfoData = await countryInfoResponse.json();

        // Handle case where country is not found
        if (countryInfoData.title === 'Not Found') return res.status(404).json({ error: 'Country not found' });
        const country = countryInfoData.commonName.toLowerCase();


        // Fetch population 
        const populationResponse = await fetch(`https://countriesnow.space/api/v0.1/countries/population`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: country })
        });
        if (!populationResponse.ok) {
            throw new Error(`Failed to fetch population data: ${populationResponse.status} ${populationResponse.statusText}`);
        }
        const populationData = await populationResponse.json();


        // Fetch flag url 
        const flagUrlResponse = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: country })
        });
        if (!flagUrlResponse.ok) {
            throw new Error(`Failed to fetch flag url: ${flagUrlResponse.status} ${flagUrlResponse.statusText}`);
        }
        const flagUrlData = await flagUrlResponse.json();


        res.json({ countryInfo: countryInfoData, population: populationData, flagUrl: flagUrlData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch country details' });
    }
});

export default router;
