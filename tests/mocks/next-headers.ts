export const requestHeaders = new Headers({
  host: "wiki.example.test",
  "x-forwarded-proto": "https",
});

export async function headers() {
  return requestHeaders;
}
