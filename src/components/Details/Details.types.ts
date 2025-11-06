import { Dispatch, SetStateAction } from "react";

export type ImageUrl = { imageUrl: string; imageType: "placeholder" | "productImage" };
export type PerfumeImage = Record<string, ImageUrl>;

export type IDetailsProps = {
  setToggleScreen?: Dispatch<SetStateAction<"display" | "details">>;
  perfumeCode: string;
};


