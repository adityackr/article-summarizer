import { Container } from '@mui/material';
import Hero from './components/Hero';
import Summary from './components/Summary';

const App = () => {
	return (
		<Container maxWidth="lg">
			<Hero />
			<Summary />
		</Container>
	);
};

export default App;
