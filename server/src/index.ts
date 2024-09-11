import express from 'express';
import countryRoutes from './routes/Countries';
const app = express();

app.use('/api/countries', countryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
