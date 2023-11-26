import Layout from "@/components/ui/Layout";
import WorkoutItemDetails from "@/components/workout/WorkoutItemDetails";
import { getWorkout } from "@/lib/api";
import { cookies } from "next/headers";

export default async function WorkoutDetailsPage({ params }) {
  const token = cookies().get("token")?.value;

  if (token) {
    const workoutParams = params;
    const workoutId = workoutParams.id;
    try {
      const response = await getWorkout({ id: workoutId }, token);
      const result = await response.json();

      if (result) {
        //const filteredResult = result.filter((item) => item.id === workoutId);
        console.log("b4 pass", result);
        return (
          <Layout>
            <WorkoutItemDetails workout={result}></WorkoutItemDetails>
          </Layout>
        );
      }
    } catch (error) {
      console.error("Error fetching workouts:", error.message);
    }
  }
}
