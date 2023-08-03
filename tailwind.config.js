/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            cellphone: "320px",
            // => @media (min-width: 320px) { ... }

            tablet: "560px",
            // => @media (max-width: 560px) { ... }

            laptop: "800px",
            // => @media (min-width: 800px) { ... }

            desktop: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            width: {
                100: "34.375rem",
                18: "4.506rem",
            },
        },
    },
    plugins: [],
};
