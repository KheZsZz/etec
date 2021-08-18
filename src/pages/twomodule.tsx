import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from 'next/link';
import  Dato  from '../utils/connectDB'
import Style from '../styles/home.module.css'
import Nav from '../components/nav'
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';

library.add(fas);

interface matter  {
  id:string;
  name:string;
  team:string;
  initials:string;
  arquivos:string;
}

const Index = ({ data }: InferGetStaticPropsType <typeof getStaticProps>) => {
  // console.log(data);
  return (
    <div className={Style.container}>
      <Nav/>
      <h1>2° Module</h1>
      {/* <h3> Matters</h3> */}
      <br/>
      <table className={Style.table}>
        <tr className={Style.titleTable}>
          <td>Subjects</td>
          <td>teams</td>
          <td>buttons</td>
        </tr>
      {
        data.data.allMatters.map((matter:matter) => (
          <tr key = { matter.id } className={Style.linha}>
              <td><h4> { matter.name } </h4></td>
              <td><p> { matter.team } </p></td>
              <td>
                <button className={Style.button}>
                <Link href={`/aulas/${matter.initials}`}>
                  <a> Classes <FontAwesomeIcon icon="arrow-alt-circle-right" style={{marginLeft:5}}/></a>
                </Link>
              </button>

              <button className={Style.button}>
                <Link href={matter?.arquivos}>
                  <a> Files <FontAwesomeIcon icon="arrow-alt-circle-down" style={{marginLeft:5}}/></a>
                </Link>
              </button>

              </td>
          </tr>
        ))
      }
      
      </table>
      {/* <Footer/> */}
    </div>
    
  );
}

export const getStaticProps:GetStaticProps = async () => {
  const { dato } = Dato();

  const res = await fetch(dato.uri, {
    method:"POST",
    headers:{
      'Authorization':dato.token,
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body:JSON.stringify({ "query":`query {
        allMatters (filter: {module: {eq: "2"}} orderBy: name_ASC){
            id
            name
            team
            initials
            arquivos
        }
      }`,
    }),
  });
  const data:matter[]  = await res.json();
  return {
    props : {
      data,
    },
    revalidate : 1,
  }
}

export default Index;