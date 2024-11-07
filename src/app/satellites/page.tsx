import React from "react";
import { type Satellite } from "@/types/satellite";
import Link from "next/link";
const Satellites = async () => {
  return <div>WORK IN PROGRESS!!</div>;

  let satData: Array<Satellite> = [];
  try {
    const data = await fetch(
      "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json",
    );
    satData = await data.json();
  } catch (error) {
    console.error("Error fetching satellite data:", error);
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-center">
          There was an error fetching the satellite data. Please try again
          later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-2">Space Stations</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          gap: 10,
        }}
      >
        {satData.map((data) => {
          return (
            <Link
              key={data.OBJECT_ID}
              href={`/plot/${data.NORAD_CAT_ID}`}
              className="flex cursor-pointer items-center justify-center rounded-md border border-gray-400 p-1 transition-all hover:shadow-md"
            >
              <p className="text-center text-sm font-medium">
                {data.OBJECT_NAME}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Satellites;
