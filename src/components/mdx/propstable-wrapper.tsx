import React from "react";
import { PropsTable } from "@/components/propstable";

function getText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getText).join("");
  }

  if (React.isValidElement(node)) {
    return getText(node.props.children);
  }

  return "";
}

export function MDXPropsTable(
  props: React.TableHTMLAttributes<HTMLTableElement>
) {
  const rows: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[] = [];

  const tbody = React.Children.toArray(props.children).find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === "tbody"
  );

  if (!tbody) {
    return <table {...props} />;
  }

  const trs = React.Children.toArray(tbody.props.children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );

  for (const tr of trs) {
    const tds = React.Children.toArray(tr.props.children).filter(
      (child): child is React.ReactElement => React.isValidElement(child)
    );

    if (tds.length < 4) continue;

    rows.push({
      prop: getText(tds[0].props.children),
      type: getText(tds[1].props.children),
      default: getText(tds[2].props.children),
      description: getText(tds[3].props.children),
    });
  }

  return <PropsTable rows={rows} />;
}
