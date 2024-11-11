import React from "react";
import "./home.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchISSTLE, navigateToPlot } from "@/actions/serverActions";
const HomePage = () => {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
      }}
      className="h-screen bg-[#0E1117]"
    >
      <nav className="fixed flex h-20 w-full items-center justify-between px-10">
        <h1 className="font-orbitron text-4xl font-bold text-white">Orbital</h1>
        <p>GitHub</p>
      </nav>
      <section className="mx-auto flex h-screen max-w-[980px] flex-col items-center justify-center px-4 py-16">
        <h1 className="main-title font-orbitron text-center text-5xl font-bold leading-normal text-white">
          <span>Satellite Tracker Using TLE Data</span>
        </h1>
        <p className="mt-6 px-10 text-center text-2xl text-gray-300">
          Orbital uses TLE data to bring real-time tracking of satellites at
          your fingertips. Follow their paths across Earth with absolute
          precision.
        </p>

        <div className="mt-8 flex w-1/2 items-center gap-4">
          <Dialog>
            <DialogTrigger className="w-full rounded bg-white py-3 font-bold text-gray-700 hover:bg-gray-200">
              Track using TLE Data
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add Two-line element (TLE) Data</DialogTitle>
                <DialogDescription>
                  Two-Line Element (TLE) data is a compact format that describes
                  a satellite&apos;s orbital elements. Each TLE has two lines of
                  numbers that represent a satellite’s orbital path parameters.
                  &nbsp;
                  <a
                    className="text-blue-500 hover:underline"
                    href="https://celestrak.org/NORAD/documentation/tle-fmt.php"
                    target="_blank"
                  >
                    Learn more.
                  </a>
                </DialogDescription>
              </DialogHeader>
              <h1 className="text-md font-medium">Example TLE Format</h1>
              <code className="rounded-md bg-gray-800 p-2 text-sm text-gray-300">
                ISS (ZARYA) <br />1 25544U 98067A 24312.04018094 .00010627
                00000-0 18519-3 0 9991 <br />2 25544 51.6401 327.7139 0008824
                139.4318 314.7087 15.51287803480701
              </code>
              <div>
                <h1 className="text-md font-medium">
                  Paste your TLE data here:
                </h1>
                <p className="text-muted-foreground text-sm">
                  (Please ensure it follows the format above)
                </p>
              </div>
              <form action={navigateToPlot}>
                <Textarea name="tleData" rows={4} placeholder="Paste here" />
                <Button className="mt-4 w-full p-6" type="submit">
                  Start Tracking
                </Button>
              </form>

              <DialogFooter>
                <p className="text-sm italic text-gray-500">
                  If you don’t have TLE data, you can get it from{" "}
                  <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    href="https://celestrak.org/NORAD/elements/"
                  >
                    CelesTrak
                  </a>
                  , a trusted source for current TLE data on various satellites
                  and space objects
                </p>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <p className="font-medium text-white">Or</p>
          <form className="w-full" action={fetchISSTLE}>
            <button
              type="submit"
              className="w-full rounded bg-white py-3 font-bold text-gray-700 hover:bg-gray-200"
            >
              Track ISS
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
