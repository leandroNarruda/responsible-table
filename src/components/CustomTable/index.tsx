import { Children, FC, Fragment, useEffect, useState } from 'react';
import { StyledTable } from './style';
import { BsArrowDownUp } from 'react-icons/bs';
import useMediaQuery from '../../hooks/useMediaQuery';

interface TableProps {
	children?: any;
	head: Array<any>;
	body: Array<Array<any>>;
	columnSize: Array<number>;
}

export const Table: FC<TableProps> = (props) => {
	const [body, setBody] = useState(props.body);
	const [controlOrder, setControlOrder] = useState<Array<boolean>>([]);

	let breaks: any = {};

	props.columnSize.forEach((e, i) => {
		breaks[props.columnSize.length - i - 1] = useMediaQuery(
			`(min-width: ${i > 0 ? props.columnSize.slice(0, -i).reduce((a, b) => a + b) : props.columnSize.reduce((a, b) => a + b)}px)`
		);
	});
	const handleClick = (e: number) => {
		const controlOrderAux = [...controlOrder];
		controlOrderAux[e] = controlOrder[e] === undefined ? true : !controlOrder[e];
		let bodyAux;
		if (isNaN(body[0][e])) {
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

		if (controlOrderAux[e]) {
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
							<Fragment key={ind}>
								{breaks[ind] && (
									<th
										onClick={() => (typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && handleClick(ind)}
										style={{ width: props.columnSize[ind] }}
									>
										{e} {(typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && <BsArrowDownUp />}
									</th>
								)}
							</Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{body.map((e, i) => (
						<tr key={i}>
							{e.map((ele, ind) => (
								<Fragment key={ind}>{breaks[ind] && <td>{ele}</td>}</Fragment>
							))}
						</tr>
					))}
				</tbody>
			</StyledTable>
		</>
	);
};
