import { Table } from './components/CustomTable';
import GlobalStyle from './style/GlobalStyle';
import { BsArrowDownUp } from 'react-icons/bs';

const data = [
	{ name: 'Carolina', idade: '19', genero: 'M' },
	{ name: 'João', idade: '35', genero: 'M' },
	{ name: 'Jurema', idade: '67', genero: 'M' },
	{ name: 'Jacira', idade: '87', genero: 'M' },
	{ name: 'Enzo', idade: '7', genero: 'M' },
	{ name: 'Davi', idade: '30', genero: 'M' },
	{ name: 'Carlos', idade: '54', genero: 'M' },
	{ name: 'Camila', idade: '37', genero: 'M' },
];

function App() {
	return (
		<>
			<GlobalStyle />
			<Table
				head={['Nomes', <>Idade</>, 'Genero']}
				body={data.map((e) => [e.name, e.idade, e.genero])}
				columnSize={[200, 300, 400]}
			></Table>
		</>
	);
}

export default App;
