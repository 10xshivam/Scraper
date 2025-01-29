import axios from "axios";
import * as cheerio from "cheerio";
import express from "express";

const app = express();
const port = 8000;
const url = 'https://ipowatch.in/ipo-grey-market-premium-latest-ipo-gmp/';

app.get('/scrape', (req, res) => {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const table = $('table:contains("Current IPOs")');
            const headers = [];
            const data = [];

            table.find('tr').first().find('th, td').each((index, element) => {
                headers.push($(element).text().trim());
            });
            data.push(headers);

            table.find('tr').each((index, element) => {
                const row = [];
                $(element).find('td').each((i, el) => {
                    row.push($(el).text().trim());
                });
                if (row.length > 0) {
                    data.push(row);
                }
            });

            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching the URL:', error);
            res.status(500).send('Error fetching the URL');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});