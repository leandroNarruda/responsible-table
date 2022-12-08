import { Table } from './components/CustomTable';
import GlobalStyle from './style/GlobalStyle';
import { BsArrowDownUp } from 'react-icons/bs';

const data = [
	{ name: 'Carolina', idade: '19' },
	{ name: 'João', idade: '35' },
	{ name: 'Jurema', idade: '67' },
	{ name: 'Jacira', idade: '87' },
	{ name: 'Enzo', idade: '7' },
	{ name: 'Davi', idade: '30' },
	{ name: 'Carlos', idade: '54' },
	{ name: 'Camila', idade: '37' },
];

function App() {
	return (
		<>
			<GlobalStyle />
			<Table head={['Nomes', <>Idade</>]} body={data.map((e) => [e.name, e.idade])}></Table>
		</>
	);
}

export default App;
