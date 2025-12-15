import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
    plugins: [
        react({
            // Important for MUI + Emotion + Vite
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: [
                    // Allows using `css` prop with Emotion (MUI recommended)
                    "@emotion/babel-plugin"
                ]
            }
        }),

        keycloakify({
            // Include your new theme
            themeName: ["default", "YighTheme"],

            // Account theme still multi-page
            accountThemeImplementation: "Multi-Page"
        })
    ],

    // Optional but recommended for MUI performance
    optimizeDeps: {
        include: [
            "@mui/material",
            "@mui/system",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled"
        ]
    },

    // Cleaner import resolution
    resolve: {
        alias: {
            "@": "/src"
        }
    },

    // Helps avoid build size explosion when using MUI
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            // Ensures repeated MUI modules aren't duplicated
            output: {
                manualChunks: {
                    mui: [
                        "@mui/material",
                        "@mui/icons-material",
                        "@emotion/react",
                        "@emotion/styled"
                    ]
                }
            }
        }
    }
});
