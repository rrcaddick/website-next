import _NextAuthPkg from "next-auth";
const NextAuth = (_NextAuthPkg as any).default ?? _NextAuthPkg;
import { tinaAuthOptions } from "../../../lib/tina-auth-options";

export default NextAuth(tinaAuthOptions);
