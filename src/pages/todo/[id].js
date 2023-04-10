import { useRouter } from 'next/router'

export default function TodoItem({TodoItemDict}){
  const router = useRouter()
  const { id } = router.query
  console.log(TodoItemDict)
  return <p>TODOItem: {TodoItemDict["todo"]}</p>
}


 
export async function getStaticProps({params}) {
	const API_ENDPOINT = `https://backend-9v7v.api.codehooks.io/dev/todoItem/${params.id}`
	// const API_ENDPOINT = "https://backend-9v7v.api.codehooks.io/dev/todoItem/64338efbf1f0a36eedd2c274"
	console.log("hello", API_ENDPOINT)
	const API_KEY = " 0ddb5c05-243e-4493-9625-8dd18a1e59f7"

	
	const response = await fetch(API_ENDPOINT, {
		'method':'GET',
		'headers': {'x-apikey': API_KEY}
	})
	const data = await response.json();
	return {
		props: { TodoItemDict: data },
	};
	
}

// https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}
