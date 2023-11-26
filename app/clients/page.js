import ClientItem from "@/components/client/ClientItem";
import Layout from "@/components/ui/Layout";
import { getClients } from "@/lib/api";
import { cookies } from "next/headers";

export default async function clientsPage() {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const response = await getClients({}, token);
      const result = await response.json();

      if (result) {
        return (
          <Layout>
            {result.map((client) => {
              return <ClientItem client={client} />;
            })}
          </Layout>
        );
      }
    } catch (error) {
      console.error("Error fetching workouts:", error.message);
    }
  }
}
