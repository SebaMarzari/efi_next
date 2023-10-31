// Styles
import './styles/styles.css'
import { authMiddleware } from "@/middleware/auth";
import Link from "next/link";
import { Table } from './components';
import ModelDetails from './components/Table/components/ModelDetails';

const DinamicTables = () => {

  return (
    <div>
      <div
        className="header-table-container"
      >
        <h1
          className="title-table"
        >
          Tablas dinamicas
        </h1>
        <Link href="/dinamic-tables/add">
          Agregar
        </Link>
      </div>
      <Table />
      <ModelDetails modelName={''} />
    </div>
  );
}

export default authMiddleware(DinamicTables);