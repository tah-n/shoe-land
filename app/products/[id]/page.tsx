import MainProductPage from "./-components/MainProductPage";

type Props = {
    params: Promise<{
        id: string;
    }>
}

const page = async ({params} : Props) => {
    const {id} = await params;

    

    return(
        <div className='relative w-[96vw] h-auto overflow-hidden'>
           <MainProductPage id={id} />
        </div>

    )
}


export default page;