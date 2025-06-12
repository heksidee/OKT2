const Notification = ({ notification }) => {

    if (!notification.message) return null;

    const notificationStyle = {
        color: "black",
        border: notification.type === "success" ? "solid 2px green" : "solid 2px red",
        backgroundColor: notification.type === "success" ? "lightgreen" : "lightgrey",
        padding: "5px",
        marginTop: "5px",
        borderRadius: "5px",
        textAlign: "center"
    }

    return (
        <div style={notificationStyle}>
            {notification.message}
        </div>
    );
};

export default Notification;