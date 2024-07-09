//Show error Alert messages
import Alert from "@mui/material/Alert";
interface IAlert {
  severity: "error" | "success" | "warning" | "info";
  message: string;
}

const ShowAlert = ({ severity, message }: IAlert) => {
  return (
    <div>
      {severity === "error" ? (
        <Alert severity="error">{message}</Alert>
      ) : severity === "success" ? (
        <Alert severity="success">{message}</Alert>
      ) : severity === "warning" ? (
        <Alert severity="warning">{message}</Alert>
      ) : (
        <Alert severity="info">{message}</Alert>
      )}
    </div>
  );
};

export default ShowAlert;
