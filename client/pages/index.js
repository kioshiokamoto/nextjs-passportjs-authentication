import Head from 'next/head';
import { parseCookies } from 'nookies';

const Home = (props) =>{
	return (
		<div className="container">
			<Head>
				<title>Nextjs OAuth with GitHub</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Welcome to Nextjs OAuth with GitHub</h1>
				{!props.authorization && <a href={'http://localhost:3001/auth/github'}>Click here to login</a>}
			</main>
		</div>
	);
}
const getUser = async (authorization) => {
	const res = await fetch('http://localhost:3001/user', { headers: { authorization } });

	if (res.status === 200) return { authorization, user: res.data };
	else return { authorization };
};
Home.getInitialProps = async (ctx) => {
	const { authorization } = parseCookies(ctx);
	const { token } = ctx.query;

	const props = getUser(authorization || token);
	return props;
};
export default Home;