export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"], // these will be protected routes and if user tries to access them without loggin in then they will be redirected to home screen
};
