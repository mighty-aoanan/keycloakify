import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Box, Typography, CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from "../theme/YighTheme"
import pdicDecal from "../assets/pdic_decal_2025.svg";
import { HeaderTitle, FooterText } from "./constants";


export default function CustomTemplate(props: Readonly<TemplateProps<KcContext, I18n>>) {
    const {
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msgStr } = i18n;

    const { realm } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }
    //TODO: Update ThemeProvider add CSS for mobile responsiveness
    //TODO: The Typography with headerText class should always be one liner no matter the screen size
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />

            <Box className="wrapperBody">

                <Box className="wrapperHeader">
                    <Typography variant="h3" className="headerText">
                        {HeaderTitle}
                    </Typography>
                </Box>
                <Box className="wrapperContent">
                    {children}
                </Box>
                <Box className="wrapperFooter">
                    <Box>
                        <img src={pdicDecal} alt="Regulatory Logo" className="regulatory-decal" />
                    </Box>
                    <Typography variant="caption">
                        {FooterText}
                    </Typography>
                </Box>
            </Box>
            <Box className="backGroundDiv" />
        </ThemeProvider>
    );
}
