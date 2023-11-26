import Layout from "@/components/ui/Layout";
import WorkoutList from "@/components/workout/WorkoutList";
import { getWorkouts } from "@/lib/api";
import { cookies } from "next/headers";

export default async function WorkoutsPage() {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      // console.log("HAS TOKEN, WORKOUTS ENTERING IF");
      const response = await getWorkouts({}, token);
      const result = await response.json();

      if (result) {
        //  console.log("b4 pass", result);
        return (
          <Layout>
            <WorkoutList workouts={result}></WorkoutList>;
          </Layout>
        );
      }
    } catch (error) {
      console.error("Error fetching workouts:", error.message);
    }
  }
}
