export function handleLogout(router: any) {
  localStorage.removeItem("token");
  router.push("/");
}
