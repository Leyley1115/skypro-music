import Bar from '../components/Bar/Bar';
import styles from './layout.module.css';

interface MusicLayoutProps {
    children: React.ReactNode;
}

export default function MusicLayout({children,}: MusicLayoutProps) {
  return (
     <div className={styles.wrapper}>
          <div className={styles.container}>
        {children} 
          </div>
          <Bar />
        <footer className="footer"></footer>
    </div>      
  );
}