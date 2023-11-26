"use client";

import TrainerForm from "@/components/forms/TrainerForm";
import Layout from "@/components/ui/Layout";
import { useSession } from "next-auth/react";
import { addTrainer } from "@/lib/api";

import useHttp from "@/hooks/use-http";
import LoadingRing from "@/components/ui/LoadingRing";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";

export default function DashboardPage(props) {
  const session = useSession();
  const token = session.data?.token ?? null;

  const {
    sendRequest: sendAddTrainerReq,
    status: statusTrainerReq,
    errorTrainerReq,
    dataTrainerReq,
  } = useHttp(addTrainer);

  async function onSubmitTrainer(formData) {
    await sendAddTrainerReq(formData, token);
  }

  if (session.status == "authenticated") {
    const role = session.data?.role;

    <h1 style={{ textAlign: "center" }}> {role} Dashboard</h1>;
    if (role == "Manager") {
      return (
        <Layout>
          <br />
          {statusTrainerReq !== "pending" && (
            <TrainerForm onSubmit={onSubmitTrainer} />
          )}
          {statusTrainerReq == "pending" && <LoadingRing />}
          {statusTrainerReq == "completed" && !errorTrainerReq && (
            <SuccessMessage message={"Trainer added!"} />
          )}
          {statusTrainerReq == "completed" && errorTrainerReq && (
            <ErrorMessage message={errorTrainerReq} />
          )}
        </Layout>
      );
    } else if (role == "PersonalTrainer") {
      return (
        <Layout>
          <h1 style={{ textAlign: "center" }}>this dashboard is not ready</h1>
        </Layout>
      );
    }
  } else if (session.status === "unauthenticated") {
    return (
      <Layout>
        <ErrorMessage message={"Log in first!"} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <LoadingRing />
      </Layout>
    );
  }
}
