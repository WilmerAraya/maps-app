/**
 * Retrieves the user's current geographic location using the browser's Geolocation API.
 * Returns a tuple containing the longitude and latitude coordinates.
 *
 * @returns {Promise<[number, number]>} A Promise that resolves to an array where the first element
 * is the longitude and the second element is the latitude (in that order).
 * @throws {GeolocationPositionError} Rejects with an error if geolocation access is denied,
 * unavailable, or times out.
 *
 * @example
 * ```tsx
 * getUserLocation()
 *   .then(([longitude, latitude]) => {
 *     console.log(`Location: ${longitude}, ${latitude}`);
 *   })
 *   .catch((error) => {
 *     console.error("Error getting location:", error.message);
 *   });
 * ```
 */

export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (error) => {
        alert('Geolocation could not be retrieved.');
        console.error('Geolocation error:', error);
        reject(error);
      }
    );
  });
};
