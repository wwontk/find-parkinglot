import React from "react";
import styled from "@emotion/styled";

interface InnerConProps {
  children: React.ReactNode;
}

const InnerCon = ({ children }: InnerConProps) => <Section>{children}</Section>;

export default InnerCon;

const Section = styled.section`
  width: 24rem;
  margin: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  @media (min-width: 800px) {
    width: 50rem;
  }
`;
