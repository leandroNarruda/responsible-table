import { Children, FC, Fragment, useState } from 'react';
import { StyledTable, StyledTbody, StyledTd, StyledTh, StyledThead, StyledTr } from './style';
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
	const [numCellExpand, setNumCellExpand] = useState<number>(-1);

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

	const expandCell = (e: number) => {
		console.log(e);
		setNumCellExpand(e);
	};

	return (
		<>
			<StyledTable>
				<StyledThead>
					<StyledTr>
						{props.head.map((e, ind) => (
							<Fragment key={ind}>
								{breaks[ind] && (
									<StyledTh
										onClick={() => (typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && handleClick(ind)}
										style={{ width: props.columnSize[ind] }}
									>
										{e} {(typeof props.body[0][ind] === 'string' || typeof props.body[0][ind] === 'number') && <BsArrowDownUp />}
									</StyledTh>
								)}
							</Fragment>
						))}
					</StyledTr>
				</StyledThead>
				<StyledTbody>
					{body.map((e, i) => (
						<Fragment key={i}>
							<StyledTr onClick={() => Object.keys(breaks).some((e) => !breaks[e]) && expandCell(i)}>
								{e.map((ele, ind) => (
									<Fragment key={ind}>{breaks[ind] && <StyledTd>{ele}</StyledTd>}</Fragment>
								))}
							</StyledTr>

							{numCellExpand === i && Object.keys(breaks).findIndex((element) => !breaks[element]) !== -1 && (
								<>
									{e.map(
										(value, index) =>
											index >= Object.keys(breaks).findIndex((element) => !breaks[element]) && (
												<>
													<div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
														{props.head[index]}: {value}
													</div>
												</>
											)
									)}
								</>
							)}
						</Fragment>
					))}
				</StyledTbody>
			</StyledTable>
		</>
	);
};
