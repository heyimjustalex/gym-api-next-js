"use client";

// Import statements for components and hooks
import LoadingRing from "@/components/ui/LoadingRing";
import SuccessMessage from "@/components/ui/SuccessMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Layout from "@/components/ui/Layout";
import useHttp from "@/hooks/use-http";
import { addUser } from "@/lib/api";
import { useSession } from "next-auth/react";
import CreateClientForm from "@/components/forms/CreateClientForm";

// ClientAddPage component definition
export default function ClientAddPage() {
  const session = useSession();
  const token = session.data?.token ?? null;

  // Using the useHttp hook to manage the API request state
  const {
    sendRequest: sendAddUserReq,
    status: statusUserReq,
    error: errorUserReq,
    data: dataUserReq,
  } = useHttp(addUser);

  // Form submission handler
  async function onSubmitUser(formData) {
    console.log("Token before API call:", token);
    await sendAddUserReq(formData, token);
  }

  // Render the component
  return (
    <Layout>
      {/*<h1 style={{ textAlign: "center" }}> {role} Dashboard</h1>;*/}
      <br /> <br />
      {/* Render the CreateClientForm component and pass the onSubmitUser function as a prop */}
      <CreateClientForm onSubmit={onSubmitUser} />
      {/* Display loading spinner while the request is pending */}
      {statusUserReq === "pending" && <LoadingRing />}
      {/* Display success message if the request is completed successfully */}
      {statusUserReq === "completed" && !errorUserReq && (
        <SuccessMessage message={"User added!"} />
      )}
      {/* Display error message if there was an error in the request */}
      {statusUserReq === "completed" && errorUserReq && (
        <ErrorMessage message={errorUserReq} />
      )}
    </Layout>
  );
}
