/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as satellite from "satellite.js";
import { type Coordinates } from "../types/satellite";

class SatelliteService {
  satrec: satellite.SatRec;

  constructor(tleLine1: string, tleLine2: string) {
    this.satrec = satellite.twoline2satrec(tleLine1, tleLine2);
  }

  getSatellitePosition(): Coordinates | null {
    const now = new Date();
    const positionAndVelocity = satellite.propagate(this.satrec, now);
    const positionEci =
      positionAndVelocity.position as satellite.EcfVec3<satellite.Kilometer>;

    if (positionEci) {
      const gmst = satellite.gstime(now);
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);

      const longitude = satellite.degreesLong(positionGd.longitude);
      const latitude = satellite.degreesLat(positionGd.latitude);

      return { latitude, longitude };
    }
    return null;
  }

  getSatelliteVelocity(): number | null {
    const now = new Date();
    const positionAndVelocity = satellite.propagate(this.satrec, now);

    // Extract the velocity vector
    const velocityEci =
      positionAndVelocity.velocity as satellite.EcfVec3<satellite.KilometerPerSecond>;

    if (velocityEci) {
      // Calculate the magnitude of the velocity vector in km/s
      //The magnitude (speed) of the velocity vector is calculated using the formula:
      const velocityKps = Math.sqrt(
        Math.pow(velocityEci.x, 2) +
          Math.pow(velocityEci.y, 2) +
          Math.pow(velocityEci.z, 2),
      );

      // Convert velocity from km/s to km/h
      const velocityKph = velocityKps * 3600;

      return velocityKph;
    }
    return null;
  }
  getSatelliteAltitude(): number | null {
    const now = new Date();
    const positionAndVelocity = satellite.propagate(this.satrec, now);
    const positionEci =
      positionAndVelocity.position as satellite.EcfVec3<satellite.Kilometer>;

    if (positionEci) {
      const gmst = satellite.gstime(now);
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Altitude in kilometers
      const altitude = positionGd.height;
      return altitude;
    }
    return null;
  }
}

export default SatelliteService;
