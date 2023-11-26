import { getWorkouts } from "@/lib/api";
import { cookies } from "next/headers";

export default function WorkoutsPage() {
  const token = cookies().get("token");
  const role = cookies().get("role");
  if (token && role == "") {
  }
  return <>{token?.value}</>;
}
