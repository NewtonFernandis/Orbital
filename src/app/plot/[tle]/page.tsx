"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useParams } from "next/navigation";
import { type SatelliteInfo } from "../../../types/satellite";

const Tracker = dynamic(() => import("@/components/Tracker/Tracker"), {
  ssr: false,
});
const Plot = () => {
  const [satInfo, setSatInfo] = React.useState<SatelliteInfo | null>(null);
  const params = useParams<{ tle: string }>();
  const decodedTleData = decodeURIComponent(params.tle);
  const lines = decodedTleData.trim().split("\n");
  const name = lines[0]?.trim();
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "300px 1fr",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
        }}
        className="bg-[#0F121A] p-4 text-gray-200 shadow-lg"
      >
        <h1 className="font-orbitron mb-2 text-4xl font-bold text-white">
          Orbital
        </h1>
        <hr />
        <br />
        <br />
        <h1 className="font-orbitron text-2xl font-bold">Satellite Details</h1>
        <br />
        <h1 className="font-orbitron mb-2 text-lg font-bold">
          <span>Name: </span>
          {name}
        </h1>
        {satInfo ? (
          <>
            <div className="mb-4">
              <h2 className="font-orbitron text-lg font-bold">Position</h2>
              <p className="font-orbitron text-sm font-medium">
                Latitude: {satInfo?.coords?.latitude.toFixed(3)}
                <br />
                Longitude: {satInfo.coords?.longitude.toFixed(3)}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="font-orbitron text-lg font-bold">Velocity</h2>
              <p className="font-orbitron text-sm font-medium">
                {satInfo.velocity?.toFixed(3)} km/h
              </p>
            </div>
            <div className="mb-4">
              <h2 className="font-orbitron text-lg font-bold">Altitude</h2>
              <p className="font-orbitron text-sm font-medium">
                {satInfo.altitude?.toFixed(3)} km
              </p>
            </div>
          </>
        ) : (
          <h1 className="font-orbitron mb-4 text-lg font-bold">Loading...</h1>
        )}
        <div>
          <h1 className="font-orbitron text-lg font-bold">Time (GMT)</h1>
          <p className="font-orbitron text-sm font-medium">
            {new Date().toUTCString()}
          </p>
        </div>
      </div>
      <div>
        <Tracker setSatInfo={setSatInfo} />
      </div>
    </div>
  );
};

export default Plot;
