import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060504",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 28,
            height: 28,
            borderRadius: 14,
            background:
              "radial-gradient(circle at 38% 32%, #F4E7C1 0%, #DCB95F 30%, #A97F1F 62%, #6E5514 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
