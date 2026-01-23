import { useRouter } from "next/navigation";

export type AppRoute =
    | "/login"
    | "/register"
    | "/dashboard"
    | "/admin"
    | "/profile"
    ;

export function useAppNavigation() {
    const router = useRouter();

    const navigateTo = (path: AppRoute) => router.push(path);

    return {
        router,
        goToLogin: () => navigateTo("/login"),
        goToRegister: () => navigateTo("/register"),
        goToDashboard: () => navigateTo("/dashboard"),
        goToAdmin: () => navigateTo('/admin'),
        goToProfile: () => navigateTo("/profile"),
        goBack: () => router.back(),
    };
}
