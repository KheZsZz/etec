import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from 'next/link'
import route from 'next/router'
import Dato from '../../utils/connectDB';
import Style from './aulas.module.css'
import StyleTable from '../../styles/home.module.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const { dato } = Dato();

interface matter {
    initials: string,
    name?: string
}
interface aula {
    description: string;
    id: string;
    data: string;
    descript: string;
    uri: string;
    matter: string;
    files: string
}

const Aulas = ({ data, matter }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className={Style.container}>
            <div className={Style.title}>
                {matter.data.allMatters.map((title: matter) => (
                    <h1 key={title.initials}>
                        {title.name}
                    </h1>
                ))}
                <button onClick={() => { route.push('/') }}>
                    <FontAwesomeIcon icon="arrow-alt-circle-left" style={{ marginRight: 5 }} />
                    Voltar
                </button>
            </div>
            <h2 className={Style.subtitle}></h2>
            <table className={StyleTable.table} id="tableAulas">
                <tr className={StyleTable.titleTable}>
                    <td>N°</td>
                    <td>Data</td>
                    <td className={Style.tableAulas}> Descrição </td>
                    <td></td>
                </tr>
                {
                    data.data.allAulas.map((aula: aula) => (
                        <tr key={aula.id} className={StyleTable.linha}>
                            <td>
                                <h3>{aula.descript}</h3>
                            </td>
                            <td>
                                <h4>{
                                    new Date(aula.data).toDateString()
                                }
                                </h4>
                            </td>
                            <td className={Style.tableAulas}>
                                <h4>{aula.description}</h4>
                            </td>
                            <td>
                                <button className={StyleTable.button}>
                                    <Link href={aula.uri}>
                                        <a target="_blank">Aula <FontAwesomeIcon icon="arrow-alt-circle-right" style={{ marginLeft: 5 }} /></a>
                                    </Link>
                                </button>

                                <button className={StyleTable.button}>
                                    <Link href={aula?.files}>
                                        <a target="_blank"> Arquivos <FontAwesomeIcon icon="arrow-alt-circle-down" style={{ marginLeft: 5 }} /></a>
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(dato.uri, {
        method: "POST",
        headers: {
            'Authorization': dato.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "query": `query {
            allMatters {
                initials
            }
          }`,
        }),
    });
    const data = await res.json();
    const paths = data.data.allMatters.map((sigle: matter) => {
        return { params: { initials: sigle.initials } }
    });
    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const { initials }: any = context.params
    const res = await fetch(dato.uri, {
        method: "POST",
        headers: {
            'Authorization': dato.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "query": `query {
            allAulas(filter: {matter: {matches: {pattern: "${initials}"}}}, orderBy: descript_ASC) {
              id
              matter
              uri
              descript
              data
              description
              files
            }
          }`,
        }),
    });

    const resMatter = await fetch(dato.uri, {
        method: "POST",
        headers: {
            'Authorization': dato.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "query": `query{
            allMatters(filter:{initials:{matches:{pattern:"${initials}"}}}){
              name
            }
          }`
        }),
    });

    const data = await res.json();
    const matter = await resMatter.json();

    return {
        props: {
            data,
            matter,
        },
        revalidate: 1,
    }
}

export default Aulas;