import "../css/global.css";

export const metadata = {
    title: "Todo",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
