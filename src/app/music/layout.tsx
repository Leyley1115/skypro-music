import Bar from '../components/Bar/Bar';
import FetchingTracks from '../components/FetchingTracks/FetchingTracks';
import SideBar from '../components/SideBar/SideBar';
import styles from './layout.module.css';
import Navigation from '../components/Nav/Nav';

export default function MusicLayout({children,}: {children: React.ReactNode}) {
  return (
     <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Navigation />
          {children}
          <SideBar />
          </main>
          <Bar />
          <footer className="footer"></footer>
          </div>
          
    </div>      
  );
}