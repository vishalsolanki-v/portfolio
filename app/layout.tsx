import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk, Roboto, Montserrat, Poppins, Playfair_Display, Fira_Sans, Lora } from 'next/font/google';

const interFont = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins'
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfairDisplay'
});

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-firaSans'
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora'
});

export const metadata: Metadata = {
  title: "Vishal Solanki | Web Developer",
  description: "Experienced Front End Developer specializing in React.js and Next.js with over 2 years of hands-on expertise. Proven track record of crafting responsive, user-friendly interfaces and implementing modern web technologies. Passionate about creating seamless user experiences through clean and efficient code. Strong problem-solving skills and adept at collaborating with cross-functional teams to deliver high-quality projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`hide-scrollbar  ${interFont.variable} ${spaceGrotesk.variable} ${roboto.variable} ${montserrat.variable} ${poppins.variable} ${playfairDisplay.variable} ${firaSans.variable} ${lora.variable}`}>
        {children}

      </body>
    </html>
  );
}
