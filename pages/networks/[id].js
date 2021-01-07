import {useRouter} from 'next/router';

const Network = () => {

    const router = useRouter();
    const {id} = router.query;

    return (
        <p>Network: {id}</p>
    )
}

export default Network;