"use server";

import { redirect } from "next/navigation";

export const navigateToPlot = async (formData: FormData) => {
  const tleData = formData.get("tleData");
  const encodedTleData = encodeURIComponent(tleData); // Encode the TLE data
  redirect(`/plot/${encodedTleData}`);
};

export const fetchISSTLE = async () => {
  const data = await fetch("https://live.ariss.org/iss.txt");
  const issTLE = await data.text();
  const encodedTleData = encodeURIComponent(issTLE); // Encode the TLE data
  redirect(`/plot/${encodedTleData}`);
};
