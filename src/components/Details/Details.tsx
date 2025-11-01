import { IDetailsProps } from "./Details.types";
import cn from "classnames";
import perfumeImageMap from "../../image";
import styles from "./Details.module.css";

const Details = (props: IDetailsProps) => {
  const { setToggleScreen, perfumeCode } = props;

  const imageUrl = perfumeImageMap[perfumeCode as string]?.imageUrl;
  const imageType = perfumeImageMap[perfumeCode as string]?.imageType;

  return (
    <div className={styles.container}>
      <div className={styles.btnContent}>
        <button
          className={styles.btn}
          onClick={() => setToggleScreen("display")}
        >
          Return to Product table
        </button>
      </div>
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
