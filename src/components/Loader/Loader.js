import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Spiner() {
  return (
    <div className={s.wrapperLoader}>
      <Loader
        type="Oval"
        color="#3f51b5"
        height={60}
        width={60}
        timeout={3000}
      />
    </div>
  );
}
