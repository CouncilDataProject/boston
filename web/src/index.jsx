import React from "react";
import ReactDOM from "react-dom";
import { App, AppConfigProvider } from "@councildataproject/cdp-frontend";

import "@councildataproject/cdp-frontend/dist/index.css";

const config = {
    firebaseConfig: {
        options: {
            projectId: "cdp-boston-c384047b",
        },
        settings: {},
    },
    municipality: {
        name: "Boston",
        footerLinksSections: [],
    },
}

ReactDOM.render(
    <div>
        <AppConfigProvider appConfig={config}>
            <App />
        </AppConfigProvider>
    </div>,
    document.getElementById("root")
);