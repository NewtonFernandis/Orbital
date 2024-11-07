"use client";

import React, { useEffect, useRef } from "react";
import SatelliteService from "@/services/satellite";
import { useParams } from "next/navigation";
import { type Marker, type Map } from "leaflet";
import L from "leaflet";
import "./Tracker.css";
import { satelliteIcon } from "@/services/map";
import { type SatelliteInfo, type Coordinates } from "@/types/satellite";

interface Props {
  setSatInfo: (satInfo: SatelliteInfo) => void;
}
const Tracker = ({ setSatInfo }: Props) => {
  const params = useParams<{ tle: string }>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerInstance = useRef<Marker | null>(null);

  useEffect(() => {
    const map = L.map("map").setView([20.593, 78.962], 8);
    mapInstance.current = map;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    markerInstance.current = L.marker([20.593, 78.962], {
      icon: satelliteIcon,
    }).addTo(map);
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const fetchDataAndStartTracking = () => {
      try {
        const data = fetchSatelliteData();
        if (data) {
          startTracking(data[0], data[1]);
        }
      } catch (error) {
        console.error("Error fetching satellite data:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchDataAndStartTracking();
    }

    // Cleanup function to stop tracking on unmount or noradId change
    return () => stopTracking();
  }, [params.tle]);

  function fetchSatelliteData() {
    const decodedTleData = decodeURIComponent(params.tle);
    const lines = decodedTleData.trim().split("\n");
    return lines.length >= 3 ? [lines[1]?.trim(), lines[2]?.trim()] : null;
  }

  function startTracking(
    tleLine1: string | undefined,
    tleLine2: string | undefined,
  ) {
    const satelliteService = new SatelliteService(tleLine1, tleLine2);
    stopTracking(); // Stop any existing interval
    const position = satelliteService.getSatellitePosition() ?? {
      latitude: 20.593,
      longitude: 78.962,
    };
    updateMarkerPosition(position);
    intervalRef.current = setInterval(() => {
      const position: Coordinates | null =
        satelliteService.getSatellitePosition();
      const velocity = satelliteService.getSatelliteVelocity();
      const altitude = satelliteService.getSatelliteAltitude();

      if (position && velocity && altitude) {
        setSatInfo({
          coords: position,
          velocity,
          altitude,
        });
        updateMarkerPosition(position);
      }
    }, 1000);
  }

  function updateMarkerPosition(position: {
    latitude: number;
    longitude: number;
  }) {
    if (mapInstance.current) {
      mapInstance.current
        .panTo([position.latitude, position.longitude])
        .getCenter();

      if (markerInstance.current) {
        markerInstance.current.setLatLng([
          position.latitude,
          position.longitude,
        ]);
      }
    }
  }

  function stopTracking() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
      id="map"
    ></div>
  );
};

export default Tracker;
