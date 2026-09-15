import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tokensPath = join(process.cwd(), "src/design-system/tokens.css");
const tokenLines = readFileSync(tokensPath, "utf8").split("\n");

function readColorToken(name: string): string {
  const declaration = tokenLines.find((line) => line.trim().startsWith(`${name}:`));
  if (!declaration) {
    throw new Error(`Design token ${name} not found in ${tokensPath}`);
  }
  return declaration.slice(declaration.indexOf(":") + 1, declaration.indexOf(";")).trim();
}

const palette = {
  cyan: readColorToken("--brand-cyan"),
  violetaOscuro: readColorToken("--brand-violeta-oscuro"),
  violetaMedio: readColorToken("--brand-violeta-medio"),
  lavanda: readColorToken("--brand-lavanda"),
  onViolet: readColorToken("--secondary-foreground"),
} as const;

const siteHost = new URL(siteConfig.url).host;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundImage: `linear-gradient(135deg, ${palette.violetaOscuro} 0%, ${palette.violetaMedio} 100%)`,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            backgroundColor: palette.cyan,
          }}
        />
        <span
          style={{
            fontSize: "26px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: palette.cyan,
          }}
        >
          Feria multisectorial del NOA
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "8px",
            marginBottom: "28px",
            borderRadius: "999px",
            backgroundColor: palette.cyan,
          }}
        />
        <span
          style={{
            fontSize: "128px",
            lineHeight: 1,
            fontWeight: 700,
            color: palette.onViolet,
          }}
        >
          {siteConfig.name}
        </span>
        <span
          style={{
            fontSize: "46px",
            marginTop: "24px",
            fontWeight: 400,
            color: palette.lavanda,
          }}
        >
          {siteConfig.tagline}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "26px", color: palette.lavanda }}>{siteHost}</span>
        <span style={{ fontSize: "26px", color: palette.lavanda }}>Jujuy · Argentina</span>
      </div>
    </div>,
    { ...size },
  );
}
