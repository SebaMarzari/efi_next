// Styles
import './styles/styles.css'
import Link from "next/link";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Table } from './components';
import { Suspense } from 'react';
import Loading from './loading';

const DinamicTables = async () => {
  const cookieList = cookies();
  const token = cookieList.get('token');
  const secret = process.env.JWT_KEY as string;

  if (!token) {
    redirect('/access');
  }

  try {
    jwt.verify(token.value, secret);
  } catch (error) {
    redirect('/access');
  }

  return (
    <section>
      <div className="header-table-container">
        <Suspense fallback={<Loading />}>
          <h1 className="title-table">
            Tablas dinamicas
          </h1>
          <Link href="/dinamic-tables/add">
            Agregar
          </Link>
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </section>
  );
}

export default DinamicTables;