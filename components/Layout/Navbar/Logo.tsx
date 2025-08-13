import Image from "next/image"
import Link from "next/link"
import styles from './Logo.module.scss';

function Logo() {
  return (
         <Link href="/" className={styles.logo}>
          <Image
            src="/rkicy-logo.svg"
            alt="Rkicy Technology"
            width={120}
            height={40}
            draggable={false}
            className={styles.logoImage}
          />
        </Link>   
  )
}
export default Logo