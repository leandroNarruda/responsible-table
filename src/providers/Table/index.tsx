import { useContext, createContext, useState } from 'react';
import { TableProps, ProviderProps } from '../../types';

const TableContext = createContext<TableProps>({} as TableProps);

export const TableContextProvider = ({ children }: ProviderProps) => {
	const [column, setColumn] = useState('');

	return <TableContext.Provider value={{ column, setColumn }}>{children}</TableContext.Provider>;
};

export const useTableContext = () => useContext(TableContext);
