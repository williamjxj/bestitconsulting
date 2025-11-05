## Google Map API Usage in Contact Page

This document describes how Google Maps is integrated into the contact page for displaying office locations and handling address data.

### Components Involved

- `SmartGoogleMap` (`components/SmartGoogleMap.tsx`):
  - Renders a Google Map with office locations.
  - Receives an array of office objects with address, postal code, coordinates, and other info.

### How Addresses and Locations Work

- The contact page (`app/contact/page.tsx`) defines an `offices` array:

  - Each office has `city`, `country`, `address`, `postal`, `phone`, and `coordinates`.
  - Example:
    ```js
    const offices = [
      {
        city: 'Surrey Guildford',
        country: 'Canada',
        address: '10355 152 St',
        postal: 'Surrey, BC V3R 7C3',
        phone: '+1 (236) 992-3846',
        coordinates: '49.189201, -122.804169',
      },
    ]
    ```

- The map is rendered with:

  ```tsx
  <SmartGoogleMap addresses={offices} height='400px' className='w-full' />
  ```

- Clicking the map pin or address opens Google Maps in a new tab using:
  ```js
  const openGoogleMaps = (address, postal) => {
    const fullAddress = `${address}, ${postal}`
    const encodedAddress = encodeURIComponent(fullAddress)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }
  ```

### API Key & Environment

- The Google Maps API key (if required) should be set in your environment variables or loaded securely in the map component.
- For production, restrict the API key to your domain and only expose it client-side if needed for map rendering.

### Customization

- You can add more offices by extending the `offices` array.
- The `SmartGoogleMap` component can be customized for markers, info windows, or map styles.

### References

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript/overview)
- [SmartGoogleMap component source](../components/SmartGoogleMap.tsx)

---

File location: `docs/google-map.md` — update this if you change how addresses or maps are handled in the contact page.
