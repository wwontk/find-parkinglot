import React from "react";

interface InnerConProps {
  children: React.ReactNode;
}

const InnerCon = ({ children }: InnerConProps) => (
  <section className="w-96 m-auto">{children}</section>
);

export default InnerCon;
