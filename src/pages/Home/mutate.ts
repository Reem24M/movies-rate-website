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

export const rateMovie = async (movieID: number, rating: number) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const guestSessionId = await getGuestSessionId();
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${guestSessionId}&api_key=${apiKey}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rating }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error ${res.status}: ${error.status_message}`);
  }

  return res.json();
};

export const rateTVShow = async (showID: number, rating: number) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const guestSessionId = await getGuestSessionId();
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${showID}/rating?guest_session_id=${guestSessionId}&api_key=${apiKey}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rating }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error ${res.status}: ${error.status_message}`);
  }

  return res.json();
};
