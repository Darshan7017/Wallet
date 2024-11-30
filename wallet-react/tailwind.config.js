// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                glowSweep: {
                    "0%": { left: "-100%" },
                    "100%": { left: "100%" }
                }
            },
            animation: {
                "glow-sweep": "glowSweep 0.8s ease-out forwards"
            }
        }
    },
    plugins: []
};
