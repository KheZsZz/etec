import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from 'next/link';
import Dato from '../utils/connectDB'
import Style from '../styles/home.module.css'
import Nav from '../components/nav'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
interface matter {
  id: string;
  name: string;
  team: string;
  initials: string;
}

const Index = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={Style.container}>
      <Nav />
      <h1>1° Modulo</h1>
      {/* <h3> Matters</h3> */}
      <br />
      <table className={Style.table}>
        <tr className={Style.titleTable}>
          <td>Matérias</td>
          <td>Teams</td>
          <td></td>
        </tr>
        {
          data?.data.allMatters.map((matter: matter) => (
            <tr key={matter.id} className={Style.linha}>
              <td><h4> {matter.name} </h4></td>
              <td><p> {matter.team} </p></td>
              <td>
                <button className={Style.button}>
                  <Link href={`/aulas/${matter.initials}`}>
                    <a> Aulas <FontAwesomeIcon icon="arrow-alt-circle-right" style={{ marginLeft: 5 }} /></a>
                  </Link>
                </button>

              </td>
            </tr>
          ))
        }
      </table>
    </div>

  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { dato } = Dato();

  const res = await fetch(dato.uri, {
    method: "POST",
    headers: {
      'Authorization': dato.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "query": `query {
        allMatters (filter: {module: {eq: "1"}} orderBy: name_ASC){
            id
            name
            team
            initials
        }
      }`,
    }),
  });
  const data: matter[] = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 1,
  }
}

export default Index;