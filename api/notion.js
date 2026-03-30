export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.query.path;
  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const headers = {
    'Authorization': req.headers['authorization'] || '',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (!['GET', 'HEAD'].includes(req.method) && req.body) {
    fetchOptions.body = JSON.stringify(req.body);
  }

  const response = await fetch(`https://api.notion.com/v1/${path}`, fetchOptions);
  const data = await response.json();
  return res.status(response.status).json(data);
}
