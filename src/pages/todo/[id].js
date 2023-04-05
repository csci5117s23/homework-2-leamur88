import { useRouter } from 'next/router'

export default function TodoItem({TodoItemDict}){
  const router = useRouter()
  const { id } = router.query
  console.log(TodoItemDict)
  return <p>TODOItem: {id}</p>
}


 
export async function getStaticProps() {
 
    // Call the fetch method and passing
    // the pokeAPI link
    const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/');
 
    // Parse the JSON
    const data = await response.json();
 
    // Finally we return the result
    // inside props as allPokemons
    return {
        props: { TodoItemDict: data.results },
    };
}

// https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}
