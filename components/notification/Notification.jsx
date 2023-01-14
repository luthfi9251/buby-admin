import Layout from "../layout/Layout"
import style from "./Notification.module.css"
import NotificationItem from "./NotificationItem"

export default function Notification(){
    return(
        <Layout dropable={true} title={"Notification"}>
            <NotificationItem/>
            <NotificationItem/>
        </Layout>
    )
}