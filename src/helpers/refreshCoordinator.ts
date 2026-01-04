const channel = new BroadcastChannel('auth_channel');
let refreshPromise: Promise<string> | null = null; // dùng localstorage thay

export async function getAccessTokenWithCoord(refreshFn: () => Promise<string>) {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const token = await refreshFn();
    channel.postMessage({ type: 'REFRESH_DONE', token });
    return token;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export function listenTokenUpdate(callback: (token: string) => void) {
  channel.onmessage = (evt) => {
    if (evt.data?.type === 'REFRESH_DONE') {
      callback(evt.data.token);
    }
  };
}