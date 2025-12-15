import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import CustomTemplate from "./CustomTemplate";
import defaultTemplate from "./DefaultTemplate";
import { NotificationsProvider } from "./pages/components/Notifications/context/NotificationsProvider"



import "./main.css";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;
const Login = lazy(() => import("./pages/Login"));
const Info = lazy(() => import("./pages/Info"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    // useEffect(() => {
    //     switch (kcContext.themeName) {
    //         case "YighTheme":
    //             import("./mainMBO.css");
    //             break;
    //     }
    // }, []);

    return (
        <Suspense>
            <NotificationsProvider>
                {(() => {
                    switch (kcContext.pageId) {
                        case "info.ftl": return (
                            <Info
                                {...{ kcContext, i18n, classes }}
                                Template={kcContext.themeName === "YighTheme" ? CustomTemplate : defaultTemplate}
                                doUseDefaultCss={kcContext.themeName !== "YighTheme"}
                            />
                        );
                        case "error.ftl": return (
                            <ErrorPage
                                {...{ kcContext, i18n, classes }}
                                Template={kcContext.themeName === "YighTheme" ? CustomTemplate : defaultTemplate}
                                doUseDefaultCss={kcContext.themeName !== "YighTheme"}
                            />
                        );
                        case "login.ftl": return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={kcContext.themeName === "YighTheme" ? CustomTemplate : defaultTemplate}
                                doUseDefaultCss={kcContext.themeName !== "YighTheme"}
                            />);
                        case "login-otp.ftl": return (
                            <LoginOtp
                                {...{ kcContext, i18n, classes }}
                                Template={kcContext.themeName === "YighTheme" ? CustomTemplate : defaultTemplate}
                                doUseDefaultCss={kcContext.themeName !== "YighTheme"}
                            />);
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={defaultTemplate}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </NotificationsProvider>
        </Suspense>


    );
}

const classes = {} satisfies { [key in ClassKey]?: string };


