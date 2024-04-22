import React from "react";

interface InnerConProps {
  children: React.ReactNode;
}

const InnerCon = ({ children }: InnerConProps) => (
  <section className="w-96 m-auto px-2">{children}</section>
);

export default InnerCon;
