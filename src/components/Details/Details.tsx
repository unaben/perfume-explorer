import type { IDetailsProps, PerfumeImage } from "./Details.types";
import cn from "classnames";
import styles from "./Details.module.css";
import useFetchApiData from "../../hooks/useFetchApiData";

const Details = (props: IDetailsProps) => {
  const { perfumeCode } = props;
  const {data: perfumeImageMap} = useFetchApiData<PerfumeImage>("/images.json");

  console.log({ perfumeCode });
  console.log({ perfumeImageMap });

  const imageUrl =
    perfumeImageMap?.[perfumeCode as keyof typeof perfumeImageMap]?.imageUrl;
  const imageType =
    perfumeImageMap?.[perfumeCode as keyof typeof perfumeImageMap]?.imageType;

  console.log({ imageUrl });
  console.log({ imageType });

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.imageContent, {
          [styles.placeholderImage]: imageType === "placeholder",
        })}
      >
        <img
          className={styles.img}
          src={imageUrl}
          alt={`image-code-${perfumeCode}`}
        />
      </div>
    </div>
  );
};

export default Details;
