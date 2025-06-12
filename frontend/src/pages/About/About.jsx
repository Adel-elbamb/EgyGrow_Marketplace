import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.headerSection}>
        <h1>من نحن</h1>
        <p>نحن نؤمن بأن الزراعة هي أساس الحياة والتنمية المستدامة.</p>
      </div>

      <section className={styles.contentSection}>
        <div className={styles.textBlock}>
          <h2>رؤيتنا</h2>
          <p>
            أن نكون الشركة الرائدة في مجال تقديم الحلول الزراعية المتكاملة والمبتكرة للمزارعين المصريين، والمساهمة في تطوير القطاع الزراعي لتحقيق الأمن الغذائي.
          </p>
        </div>

        <div className={styles.textBlock}>
          <h2>مهمتنا</h2>
          <p>
            تقديم منتجات وخدمات زراعية عالية الجودة بأسعار مناسبة، مع دعم مستمر للعملاء من خلال فريق متخصص يعمل بشغف وخبرة منذ عام 1998.
          </p>
        </div>

        <div className={styles.textBlock}>
          <h2>قيمنا</h2>
          <ul>
            <li>الجودة والموثوقية</li>
            <li>الابتكار المستمر</li>
            <li>خدمة العملاء المتميزة</li>
            <li>الاستدامة والوعي البيئي</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
