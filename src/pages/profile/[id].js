import axios from 'axios';

function Profile({ user = {} }) {

    return <div>
        <p>{user.id}</p>
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p></p>
        <p></p>
    </div>;
}

export async function getStaticProps(context) {

    const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: { id: context.params.id }
    })

    const user = await response.data[0];

    return {
        props: { user }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')

    const users = await response.data.slice(0, 5);

    const paths = users.map(user => {
        return { params: { id: String(user.id)} }
    })

    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

export default Profile;