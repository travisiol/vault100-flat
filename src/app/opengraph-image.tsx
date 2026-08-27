import { ImageResponse } from "next/og";

export const alt = "VAULT100 — Trade Memes. Lock The Floor.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060504",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.28), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 130,
            height: 130,
            borderRadius: 65,
            background:
              "radial-gradient(circle at 38% 32%, #F4E7C1 0%, #DCB95F 30%, #A97F1F 62%, #6E5514 100%)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 84,
            color: "#F6F1E6",
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          VAULT100
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            letterSpacing: 6,
            color: "#DCB95F",
            fontWeight: 600,
          }}
        >
          TRADE MEMES. LOCK THE FLOOR.
        </div>
      </div>
    ),
    { ...size },
  );
}
