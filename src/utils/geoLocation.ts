import geoip from "geoip-lite"; // For GeoLocation extraction based on IP

export const getGeolocation = (ipAddress: string) => {
    const geo = geoip.lookup(ipAddress);
    return geo ? { country: geo.country, region: geo.region, city: geo.city } : {};
};

