interface Props {
  message: string | null;
}

const Notification = ({ message }: Props) => {
  if (!message) return null;

  return <div style={{ color: "red" }}>{message}</div>;
};

export default Notification;
