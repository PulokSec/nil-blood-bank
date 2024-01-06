import { MetadataRoute } from "next";

export default function manifest() : MetadataRoute.Manifest{
    return{
       // paste your manifest details here eg
       id: "NilBB",
  name: "Nil Blood Bank",
  short_name: "Nil BB",
  description: "This next.js app is a PWA.",
  icons: [
    {
      src: "./assets/blood-bank-icon.png",
      sizes: "72x72",
      type: "image/png"
    },
    {
      src: "./assets/blood-bank-icon.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "./assets/blood-bank-icon.png",
      sizes: "384x384",
      type: "image/png"
    },
    {
      src: "./assets/blood-bank-icon.png",
      sizes: "512x512",
      type: "image/png"
    }
  ],
  theme_color: "none",
  background_color: "none",
  start_url: "/",
  scope: ".",
  display: "standalone",
  orientation: "portrait"
    }
}