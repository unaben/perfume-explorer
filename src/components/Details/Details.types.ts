import { Dispatch, SetStateAction } from "react";

export type IDetailsProps = {
  setToggleScreen: Dispatch<SetStateAction<"display" | "details">>;
  perfumeCode: string;
};
