import type { IDetailsProps, PerfumeImage } from "./Details.types";
import cn from "classnames";
import styles from "./Details.module.css";
import useFetchApiData from "../../hooks/useFetchApiData";

const Details = (props: IDetailsProps) => {
  const { perfumeCode } = props;

   // Automatically detects environment
   const API_URL = process.env.NODE_ENV === 'production'
   ? 'https://perfumexplorer.bellefriends.com'
   : '/api';

  const {data: perfumeImageMap} = useFetchApiData<PerfumeImage>(`${API_URL}/images.json`);

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
