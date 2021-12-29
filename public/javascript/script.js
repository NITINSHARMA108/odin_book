async function sendrequest(id) {
  console.log(id);
  const response = await fetch('/addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();
  if (result.move) {
    console.log('hello');
    window.location.href = '/friendRequests';
  } else {
    window.location.href = '/friends';
  }
}

async function confirmRequest(id) {
  console.log(id);
  const response = await fetch('/confirmRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookID: id }),
  });
  const result = await response.json();
  if (response.move) {
    window.location.href = '/friends';
  } else {
    window.location.href = '/friendRequests';
  }
}

async function cancelRequest(id) {
  console.log(id);
  const response = await fetch('/cancelRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookID: id }),
  });
  const result = await response.json();
  if (response.move) {
    window.location.href = '/friends';
  } else {
    window.location.href = '/friendRequests';
  }
}
