// import React from "react";

// interface Data {
//   id: string;
//   source: string;
//   destination: string;
//   frequency: string;
//   parking_longitude: string;
//   parking_latitude: string;
// }

// const data: Data[] = [
//   {
//     id: "1",
//     source: "State Bank",
//     destination: "Kunjathbail",
//     frequency: "Every hour",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "7",
//     source: "State Bank",
//     destination: "Urwa Store",
//     frequency: "Every 15 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "13",
//     source: "State Bank",
//     destination: "Kottara",
//     frequency: "Every hour",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "1B",
//     source: "State Bank",
//     destination: "Kodical",
//     frequency: "Every 15 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "31",
//     source: "State Bank",
//     destination: "Mannagudda Shediguri",
//     frequency: "Every 20 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "31A",
//     source: "State Bank",
//     destination: "Lalbag Shediguri",
//     frequency: "Every 20 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "31B",
//     source: "State Bank",
//     destination: "Dambel",
//     frequency: "Every hour",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "16",
//     source: "State Bank",
//     destination: "Sulthan Bathery",
//     frequency: "Every 30 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
//   {
//     id: "16A",
//     source: "State Bank",
//     destination: "Sulthan Bathery",
//     frequency: "Every 30 mins",
//     parking_longitude: "12.8665796",
//     parking_latitude: "74.9253776",
//   },
// ];

// function GoogleMap({ latitude, longitude }) {
//   useEffect(() => {
//     const iframeData = document.getElementById("iframeId");

//     if (latitude && longitude) {
//       iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&output=embed`;
//     }
//   }, [latitude, longitude]);

//   return (
//     <div>
//       <iframe id="iframeId" height="500px" width="100%"></iframe>
//     </div>
//   );
// }

// const Parking = () => {
//   return <div>parking</div>;
// };

// export default Parking;\

"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  _id: string; // Ensure the structure matches your actual token
}

interface Data {
  id: string;
  source: string;
  destination: string;
  frequency: string;
  parking_longitude: string;
  parking_latitude: string;
}

const data: Data[] = [
  {
    id: "1",
    source: "State Bank",
    destination: "Kunjathbail",
    frequency: "Every hour",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "7",
    source: "State Bank",
    destination: "Urwa Store",
    frequency: "Every 15 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "13",
    source: "State Bank",
    destination: "Kottara",
    frequency: "Every hour",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "1B",
    source: "State Bank",
    destination: "Kodical",
    frequency: "Every 15 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "31",
    source: "State Bank",
    destination: "Mannagudda Shediguri",
    frequency: "Every 20 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "31A",
    source: "State Bank",
    destination: "Lalbag Shediguri",
    frequency: "Every 20 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "31B",
    source: "State Bank",
    destination: "Dambel",
    frequency: "Every hour",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "16",
    source: "State Bank",
    destination: "Sulthan Bathery",
    frequency: "Every 30 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
  {
    id: "16A",
    source: "State Bank",
    destination: "Sulthan Bathery",
    frequency: "Every 30 mins",
    parking_longitude: "12.8665796",
    parking_latitude: "74.9253776",
  },
];

function GoogleMap({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  useEffect(() => {
    const iframeData = document.getElementById("iframeId") as HTMLIFrameElement;

    if (latitude && longitude) {
      iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&output=embed`;
    }
  }, [latitude, longitude]);

  return (
    <div>
      <iframe id="iframeId" height="500px" width="100%"></iframe>
    </div>
  );
}

const Parking = () => {
  const [routeData, setRouteData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverAndRoute = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const driverId = decodedToken._id;

        // Fetch the driver data by ID to get the route ID (assumed API)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/drivers/${driverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch driver data");
        }

        const driverData = await res.json();
        const routeId = driverData.routeId; // Assuming routeId is returned in driverData

        // Match routeId with the hardcoded route data
        const matchedRoute = data.find((route) => route.id === routeId);

        if (matchedRoute) {
          setRouteData(matchedRoute);
        } else {
          setError("Route not found for this driver.");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDriverAndRoute();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!routeData) {
    return <div>Loading route data...</div>;
  }

  return (
    <div>
      <h1>Parking Location</h1>
      <p>
        Route: {routeData.source} to {routeData.destination}
      </p>
      <GoogleMap
        latitude={routeData.parking_latitude}
        longitude={routeData.parking_longitude}
      />
    </div>
  );
};

export default Parking;
