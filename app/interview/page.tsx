import type { Metadata } from "next";
import InterviewClient from "./InterviewClient";

export const metadata: Metadata = {
  title: "SC Interview Questions — Kien Nguyen",
  description:
    "30+ bilingual technical interview questions for supply chain data roles, researched from 25+ companies.",
};

export default function InterviewPage() {
  return <InterviewClient />;
}
