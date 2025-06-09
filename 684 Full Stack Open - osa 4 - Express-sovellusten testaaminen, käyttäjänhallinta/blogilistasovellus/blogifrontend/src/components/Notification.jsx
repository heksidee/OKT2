const Notification = ({ message }) => {

    if (!message) return null;
    const notificationStyle = {
        color: "red",
        border: "solid 2px red",
        backgroundColor: "lightgrey",
        padding: "5px",
        marginTop: "5px",
        borderRadius: "5px",
        textAlign: "center"
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;