const createGuestSession = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
  );
  const data = await res.json();
  if (data.success) {
    localStorage.setItem("guest_session_id", data.guest_session_id);
    return data.guest_session_id;
  } else {
    throw new Error("Failed to create guest session");
  }
};

const getGuestSessionId = async () => {
  let guestSessionId = localStorage.getItem("guest_session_id");
  if (!guestSessionId) {
    guestSessionId = await createGuestSession();
  }
  return guestSessionId;
};

export const fetchratedMovie = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const guestSessionId = await getGuestSessionId();
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error ${res.status}: ${error.status_message}`);
  }

  return res.json();
};

export const fetchratedTV = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const guestSessionId = await getGuestSessionId();
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error ${res.status}: ${error.status_message}`);
  }

  return res.json();
};
