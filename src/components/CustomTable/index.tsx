import { Children, FC, useEffect, useState } from 'react';
import { StyledTable } from './style';
import { BsArrowDownUp } from 'react-icons/bs';
import { useTableContext } from '../../providers/Table';

interface TableProps {
	children?: any;
	head: Array<any>;
	body: Array<Array<any>>;
}

export const Table: FC<TableProps> = (props) => {
	const { column } = useTableContext();

	const [body, setBody] = useState(props.body);
	const [controlOrder, setControlOrder] = useState<Array<boolean>>([]);

	const handleClick = (e: number) => {
		const controlOrderAux = [...controlOrder];
		controlOrderAux[e] = !controlOrder[e];
		let bodyAux;
		if (typeof body[e] === 'string') {
			bodyAux = body.sort((a, b) => {
				if (a[e].toLowerCase() < b[e].toLowerCase()) {
					return -1;
				} else if (a[e].toLowerCase() > b[e].toLowerCase()) {
					return 1;
				}
				return 0;
			});
		} else {
			bodyAux = body.sort((a, b) => {
				if (parseFloat(a[e]) < parseFloat(b[e])) {
					return -1;
				} else if (parseFloat(a[e]) > parseFloat(b[e])) {
					return 1;
				}
				return 0;
			});
		}

		if (controlOrder[e]) {
			setBody([...bodyAux]);
		} else {
			setBody([...bodyAux.reverse()]);
		}

		setControlOrder(controlOrderAux);
	};

	return (
		<>
			<StyledTable>
				<thead>
					<tr>
						{props.head.map((e, ind) => (
							<th
								key={ind}
								onClick={() => (typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && handleClick(ind)}
							>
								{e} {(typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && <BsArrowDownUp />}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{body.map((e, i) => (
						<tr key={i}>
							{e.map((ele, ind) => (
								<td key={ind}>{ele}</td>
							))}
						</tr>
					))}
				</tbody>
			</StyledTable>
		</>
	);
};
