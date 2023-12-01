import styles from "@/styles/InternalServerError/index.module.scss"

export default function Custom500() {
    return <section className={styles["section"]}>500 - Internal server error!</section>
}