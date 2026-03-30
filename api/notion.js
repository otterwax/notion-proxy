{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PATCH,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization, Notion-Version" }
      ]
    }
  ]
}

  const response = await fetch(`https://api.notion.com/v1/${path}`, fetchOptions);
  const data = await response.json();
  return res.status(response.status).json(data);
}
