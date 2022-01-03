async function sendrequest(id) {
  const response = await fetch('/addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();
  window.location.reload();
}

async function confirmRequest(id) {
  const response = await fetch('/confirmRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();
  if (result.move) {
    window.location.href = '/friends';
  } else {
    window.location.href = '/friendRequests';
  }
}

async function cancelRequest(id) {
  const response = await fetch('/cancelRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();

  window.location.href = '/friendRequests';
}

async function unfriendUser(id) {
  const response = await fetch('/unfriendUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();

  window.location.href = '/friends';
}

async function likePost(id) {
  const response = await fetch('/likePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  /* const result = response.json();
  if (result.move) {
    window.location.href = '/profile';
  } else {
    window.location.href = '/profile';
  } */
  window.location.reload();
}

async function dislikePost(id) {
  const response = await fetch('/dislikePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  /* const result = response.json();
  if (result.move) {
    window.location.href = '/profile';
  } else {
    window.location.href = '/profile';
  } */
  window.location.reload();
}
