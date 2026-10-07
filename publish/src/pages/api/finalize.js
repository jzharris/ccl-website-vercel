export default async function handler(req, res) {
  const route = 'user';
  const endpoint = 'finalize';

  if (req.method == 'POST') {
    delete req.headers.host;
    delete req.headers.referer;
    // await fetch(`http://localhost:3080/${route}/${endpoint}`, {
    await fetch(`https://googlecloudrun-z4ajxgbkxq-uc.a.run.app/${route}/${endpoint}`, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((data) => res.status(data.ok ? 200 : 400).json(data))
    .catch((error) => {
      res.status(400).send(error);
    });
  } else {
    res.status(400).send('Request type not supported');
  }
}