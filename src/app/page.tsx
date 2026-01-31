import styles from './page.module.css';
import Bar from './components/Bar/Bar';
import Nav from './components/Nav/Nav';
import CenterBlock from './components/CenterBlock/CenterBlock';
import SideBar from './components/SideBar/SideBar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <CenterBlock />
          <Nav />
          <SideBar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
