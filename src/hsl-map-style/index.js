import { generateStyle } from 'hsl-map-style';

const style = generateStyle({
  sourcesUrl: 'https://cdn.digitransit.fi/', // <-- You can override the default sources URL. The default is https://api.digitransit.fi/
  queryParams: [ // It's possible to add query parameters to urls, for example apikeys.
    {
      url: 'https://cdn.digitransit.fi/', // Url pattern where the parameter should be added
      name: 'digitransit-subscription-key',
      // eslint-disable-next-line no-undef
      value: process.env.DIGITRANSIT_KEY,
      // --> &digitransit-subscription-key=my-secret-key
    },
  ],

  components: {
    // Set each layer you want to include to true

    // Styles
    base: { enabled: true }, // Enabled by default
    municipal_borders: { enabled: false },
    routes: { enabled: false },
    text: { enabled: true }, // Enabled by default
    subway_entrance: { enabled: false },
    poi: { enabled: false },
    park_and_ride: { enabled: false },
    ticket_sales: { enabled: false },
    stops: { enabled: false },
    citybikes: { enabled: false },
    ticket_zones: { enabled: false },
    ticket_zone_labels: { enabled: false },

    // Themes
    text_sv: { enabled: false },
    text_fisv: { enabled: false },
    text_en: { enabled: false },
    regular_routes: { enabled: true },
    near_bus_routes: { enabled: false },
    routes_with_departures_only: { enabled: true }, // Enabled by default. Doesn't do anything until routes is enabled.
    regular_stops: { enabled: false },
    near_bus_stops: { enabled: false },
    print: { enabled: false },
    greyscale: { enabled: true },
    simplified: { enabled: false },
    '3d': { enabled: false },
    driver_info: { enabled: false },
  },

  // optional property to filter routes
  //routeFilter: [],
  // optional property to change the date of routes and stops
  //joreDate: "2022-06-01",
});


export default style;