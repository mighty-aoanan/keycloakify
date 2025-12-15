import type { Preview } from "@storybook/react";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            },
            options: {
                showPanel: true,
                storySort: {
                    method: "alphabetical",
                    order: ["LOGIN", ["login", "info", "error", "login-otp"]]
                }
            }
        }
    }
};

export default preview;
