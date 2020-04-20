import retreiveVisitations from "../../../src/usecases/retreiveVisitations";
import Layout from "../../../src/components/Layout";
import Heading from "../../../src/components/Heading";
import ActionLink from "../../../src/components/ActionLink";
import { GridRow, GridColumn } from "../../../src/components/Grid";
import VisitationsTable from "../../../src/components/VisitationsTable";
import Text from "../../../src/components/Text";
import pgp from "pg-promise";
import verifyToken from "../../../src/usecases/verifyToken";
import TokenProvider from "../../../src/providers/TokenProvider";
import { useState } from "react";

export default function WardVisits({ scheduledCalls, error, id }) {
  const [userError, setUserError] = useState(
    error ? "Unable to display ward visits" : null
  );

  const joinCall = async ({ callId, contactNumber }) => {
    const response = await fetch("/api/send-visitation-ready-notification", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        callId,
        contactNumber,
      }),
    });

    const { callUrl, err } = await response.json();

    if (callUrl) {
      window.location.href = callUrl;
    } else {
      setUserError("Unable to join video call");
      console.error(err);
    }
  };

  if (userError) {
    return (
      <Layout title="Sorry, there is a problem with the service">
        <GridRow>
          <GridColumn width="two-thirds">
            <Heading>Sorry, there is a problem with the service</Heading>
            <Text>
              We were unable to process your request, try again later.
            </Text>
          </GridColumn>
        </GridRow>
      </Layout>
    );
  }

  return (
    <Layout title="Ward visits">
      <GridRow>
        <GridColumn width="full">
          <Heading>Ward visits</Heading>
          <h2 className="nhsuk-heading-l">Schedule a new visit</h2>
          <Text>
            You'll need the mobile number of your patient's loved one in order
            to set up a visit.
          </Text>
          <ActionLink href={`/wards/${id}/schedule-visit`}>
            Schedule visit
          </ActionLink>
          <h2 className="nhsuk-heading-l">Pre-booked visits</h2>
          {scheduledCalls.length > 0 ? (
            <VisitationsTable
              visitations={scheduledCalls}
              joinCall={joinCall}
            />
          ) : (
            <Text>There are no upcoming visits.</Text>
          )}
        </GridColumn>
      </GridRow>
    </Layout>
  );
}

export const getServerSideProps = verifyToken(
  async ({ query: { id } }) => {
    const container = {
      getDb() {
        return pgp()({
          connectionString: process.env.URI,
          ssl: {
            rejectUnauthorized: false,
          },
        });
      },
    };

    const { scheduledCalls, error } = await retreiveVisitations(container);

    return { props: { scheduledCalls, error, id } };
  },
  {
    tokens: new TokenProvider(process.env.JWT_SIGNING_KEY),
  }
);