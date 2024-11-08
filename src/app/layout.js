import { InstaOAuth } from "./(auth)/configs/Auth";
import LoadingWrapper from "./components/LoadingWrapper";
import InstagramNavbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <InstaOAuth>
        <InstagramNavbar />
        <LoadingWrapper>
          <body>{children}</body>
        </LoadingWrapper>
      </InstaOAuth>
    </html>
  );
}
