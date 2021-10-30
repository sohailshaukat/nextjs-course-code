import { useRouter } from 'next/router';

function SelectedClientProjectPage(){
    const router = useRouter();
    
    console.log(router.query)

    function loadProjectHandler (){
        // load data
        router.push("/clients/max")
    };

    return <div>
        <h1>The Project page for selected client</h1>
        <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
}

export default SelectedClientProjectPage;