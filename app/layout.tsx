"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ProgressBarProvider() {
  return (
    <ProgressBar
      height="3px"
      color="#00e676"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
