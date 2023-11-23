import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";

import { Table } from "./components/index.js";

export default function Pricing(): JSX.Element {
  usePageEffect({ title: "PRICE" });

  return useObserver(() => (
    <>
      <Table />
    </>
  ));
}
