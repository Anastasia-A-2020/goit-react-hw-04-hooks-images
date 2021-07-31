import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ onLoadButton }) => {
  return (
    <div className={s.wrapperButton}>
      <button
        type="button"
        className={s.Button}
        onClick={(e) => onLoadButton(e)}
      >
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  onLoadButton: PropTypes.func.isRequired,
};
