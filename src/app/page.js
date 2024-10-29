"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Demo from "./component/Demo";
import { Task } from "./component/Task";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./component/Task"), { ssr: false });

export default function Home() {
  return (
    <div>
      {/* <Demo /> */}
      <NoSSR />
    </div>
  );
}
