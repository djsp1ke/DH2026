import styles from './DataRow.module.css';

interface DataRowProps {
  number: string;
  title: string;
  regulation: string;
  status: string;
  statusClass: 'free' | 'locked' | 'completed' | 'inProgress';
  onClick?: () => void;
}

export default function DataRow({
  number,
  title,
  regulation,
  status,
  statusClass,
  onClick,
}: DataRowProps) {
  return (
    <div className={styles.row} onClick={onClick} role="button" tabIndex={0}>
      <span className={styles.num}>{number}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.reg}>{regulation}</span>
      <span className={`${styles.status} ${styles[statusClass]}`}>{status}</span>
    </div>
  );
}

export function DataRowHeader() {
  return (
    <div className={`${styles.row} ${styles.header}`}>
      <span>#</span>
      <span>Case</span>
      <span>Regulation</span>
      <span style={{ textAlign: 'right' }}>Status</span>
    </div>
  );
}
