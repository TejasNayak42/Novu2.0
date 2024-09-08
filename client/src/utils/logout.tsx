import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function handleLogout(router: AppRouterInstance) {
  localStorage.removeItem("token");
  router.push("/");
}
