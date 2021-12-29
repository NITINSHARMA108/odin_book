async function sendrequest(id) {
  console.log(id);
  const response = await fetch('/addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
}
