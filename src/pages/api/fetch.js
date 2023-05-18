export default async function handler(req, res) {
  try {
    let {
      siteName
    } = req.query;
    if (!siteName.includes('https://')) {
      siteName = 'https://' + siteName;
    }
    const response = await fetch(siteName);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching data from the specified site");
  }
}