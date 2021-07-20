type AlertType = {
  additionalClassName: string;
  text: string;
};

const Alert: React.FC<AlertType> = ({ additionalClassName, text }) => {
  return (
    <div className={`alert ${additionalClassName}`} role="alert">
      {text}
    </div>
  );
};
export default Alert;
