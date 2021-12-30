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
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }
}

async function confirmRequest(id) {
  console.log(id);
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
  console.log(id);
  const response = await fetch('/cancelRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facebookId: id }),
  });
  const result = await response.json();
  if (result.move) {
    window.location.href = '/friendRequests';
  } else {
    window.location.href = '/friendRequests';
  }
}

async function unfriendUser(id) {
  console.log(id);
  const response = await fetch('/unfriendUser', {
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
    window.location.href = '/';
  }
}

async function likePost(id) {
  const response = await fetch('/likePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const result = response.json();
  if (result.move) {
    window.location.href = '/profile';
  } else {
    window.location.href = '/profile';
  }
}

async function dislikePost(id) {
  const response = await fetch('/dislikePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const result = response.json();
  if (result.move) {
    window.location.href = '/profile';
  } else {
    window.location.href = '/profile';
  }
}
