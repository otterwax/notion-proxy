export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const path = req.query.path;
  const token = req.headers['authorization'];

  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    method: req.method,
    headers: {
      'Authorization': token,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
