import React from "react";
import { GridRow, GridColumn } from "../../../src/components/Grid";
import ActionLink from "../../../src/components/ActionLink";
import Text from "../../../src/components/Text";
import Heading from "../../../src/components/Heading";
import Layout from "../../../src/components/Layout";
import verifyToken from "../../../src/usecases/verifyToken";
import TokenProvider from "../../../src/providers/TokenProvider";

const Success = ({ id }) => {
  return (
    <Layout title="Schedule a virtual visit">
      <GridRow>
        <GridColumn width="two-thirds">
          <Heading>Virtual visit scheduled</Heading>

          <Text>
            Your virtual visit has been scheduled and the key contact has been
            sent an SMS with their scheduled time.
          </Text>

          <ActionLink href={`/wards/${id}/schedule-visit`}>
            Schedule another visit
          </ActionLink>
          <ActionLink href={`/wards/${id}/visits`}>View visits</ActionLink>
        </GridColumn>
      </GridRow>
    </Layout>
  );
};

export const getServerSideProps = verifyToken(
  ({ query }) => {
    const { id } = query;
    return { props: { id } };
  },
  {
    tokens: new TokenProvider(process.env.JWT_SIGNING_KEY),
  }
);

export default Success;
